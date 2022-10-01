import path from "path";
import fs from "fs";
import { Writesonic } from "../lib/writesonic";
import { getArticleData } from "../node-utils/getArticleData";
import { readArticleImageFile } from "../node-utils/readArticleImageFile";
import slugify from "slugify";
import sharp from "sharp";
import { Dalle } from "../lib/dalle";
import { imagesPath } from "../node-utils/paths";
import { Translate } from "../lib/translate";
import { Ora } from "ora";
import { Locale, Post } from "../types";
import { serializeMarkdown } from "../node-utils/serializeMarkdown";

const ai = new Writesonic();
const translateAPI = new Translate();

export async function generateArticles(spinner: Ora) {
  const titlesAndCategories = getArticleData();

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    spinner.prefixText = "✏️";
    spinner.text = `Generating article titled(${i + 1}/${
      titlesAndCategories.length
    }): ${title}`;

    const response = await ai.generateArticle({
      title,
    });
    const { imageSrc, imageSrcBase64 } = await generateAndWriteImage(title);

    const basePost = {
      category,
      imageSrc,
      imageSrcBase64,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const post: Record<Locale, Post> = {
      en: {
        ...basePost,
        categoryLocal: category,
        slug: slugify(title, { strict: true, lower: true }),
        locale: "en",
        title: response.title,
        summary: response.summary,
        intro: await serializeMarkdown(response.intro),
        content: await serializeMarkdown(response.content),
        relatedArticles: [],
      },
      es: {
        ...basePost,
        slug: slugify(await translateAPI.translate(response.title), {
          strict: true,
          lower: true,
        }),
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

    const contentPath = path.join(__dirname, "../content");

    fs.writeFileSync(
      path.join(contentPath, `${post.en.slug}.json`),
      JSON.stringify(post.en, null, 2)
    );
    fs.writeFileSync(
      path.join(contentPath, `${post.es.slug}.json`),
      JSON.stringify(post.es, null, 2)
    );
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
    console.log("before");
    const base64String = await dalle.generateImage(title);
    console.log("after");

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
