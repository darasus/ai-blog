import path from "path";
import fs, { readFileSync } from "fs";
import { Writesonic } from "../lib/writesonic";
import { getArticleData } from "../node-utils/getArticleData";
import { readArticleImageFile } from "../node-utils/readArticleImageFile";
import slugify from "slugify";
import sharp from "sharp";
import { Dalle } from "../lib/dalle";
import { imagesPath, postsPath } from "../node-utils/paths";
import { Translate } from "../lib/translate";
import { Ora } from "ora";
import { Locale, Post } from "../types";
import { serializeMarkdown } from "../node-utils/serializeMarkdown";
import { omit } from "ramda";

const isEqual = require("lodash/isEqual");

const ai = new Writesonic();
const translateAPI = new Translate();

export async function generateArticles(spinner: Ora) {
  const titlesAndCategories = getArticleData();

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    spinner.prefixText = "✏️";
    spinner.text = `Generating article titled(${i + 1}/${
      titlesAndCategories.length
    }): ${title}`;

    const slug: Record<Locale, string> = {
      en: slugify(title, { strict: true, lower: true }),
      es: slugify(await translateAPI.translate(title), {
        strict: true,
        lower: true,
      }),
    };
    const response = await ai.generateArticle({
      title,
    });
    const originalPost: Record<Locale, Post | null> = {
      en: JSON.parse(
        readFileSync(path.join(postsPath, `${slug.en}.json`), "utf8")
      ) as Post,
      es: JSON.parse(
        readFileSync(path.join(postsPath, `${slug.es}.json`), "utf8")
      ) as Post,
    };

    const { imageSrc, imageSrcBase64 } = await generateAndWriteImage(title);

    const basePost = {
      category,
      imageSrc,
      imageSrcBase64,
    };

    const post: Record<Locale, Post> = {
      en: {
        ...basePost,
        createdAt: originalPost.en?.createdAt ?? new Date().toISOString(),
        updatedAt: originalPost.en?.updatedAt ?? new Date().toISOString(),
        categoryLocal: category,
        slug: slug.en,
        locale: "en",
        title,
        summary: response.summary,
        intro: await serializeMarkdown(response.intro),
        content: await serializeMarkdown(response.content),
        relatedArticles: [],
      },
      es: {
        ...basePost,
        createdAt: originalPost.es?.createdAt ?? new Date().toISOString(),
        updatedAt: originalPost.es?.updatedAt ?? new Date().toISOString(),
        slug: slug.es,
        locale: "es",
        categoryLocal: await translateAPI.translate(category),
        title: await translateAPI.translate(response.title),
        summary: await translateAPI.translate(response.summary),
        intro: await serializeMarkdown(
          await translateAPI.translate(response.intro)
        ),
        content: await serializeMarkdown(
          await translateAPI.translate(response.content)
        ),
        relatedArticles: [],
      },
    };

    const isSameAsOriginal = isEqual(
      omit(["relatedArticles"], originalPost.en),
      omit(["relatedArticles"], post.en)
    );

    const contentPath = path.join(__dirname, "../content");

    if (!isSameAsOriginal) {
      const updatedAt = new Date().toISOString();
      const newPost: Record<Locale, Post> = {
        en: { ...post.en, updatedAt },
        es: { ...post.es, updatedAt },
      };
      for (const locale of Object.keys(newPost)) {
        const post = newPost[locale as Locale];
        fs.writeFileSync(
          path.join(contentPath, `${post.slug}.json`),
          JSON.stringify(post, null, 2)
        );
      }
    }
  }

  spinner.stopAndPersist();
  spinner.start();
  spinner.prefixText = "✅";
  spinner.text = `Done generating ${titlesAndCategories.length} articles!`;
  spinner.stopAndPersist();
}

async function generateAndWriteImage(title: string) {
  const basename = slugify(title, { strict: true, lower: true });
  const image = readArticleImageFile(basename + ".png");

  let imageSrc = "";
  let imageSrcBase64 = "";

  if (image) {
    const img = sharp(image).resize(10);
    const base64url = (await img.toBuffer()).toString("base64");
    imageSrc = "/articles/" + basename + ".png";
    imageSrcBase64 = "data:image/png;base64," + base64url;
  } else {
    const dalle = new Dalle();
    const base64String = await dalle.generateImage(title);

    if (base64String) {
      fs.writeFileSync(
        path.join(imagesPath, `${basename}.png`),
        base64String,
        "base64"
      );

      imageSrc = "/articles/" + basename + ".png";
      const img = sharp(Buffer.from(base64String, "base64")).resize(10);
      const srcBase64 = (await img.toBuffer()).toString("base64");
      imageSrcBase64 = "data:image/png;base64," + srcBase64;
    } else {
      imageSrc = "";
      imageSrcBase64 = "";
    }
  }

  return { imageSrc, imageSrcBase64 };
}
