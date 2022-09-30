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

const ai = new Writesonic();
const translateAPI = new Translate();

export async function generateArticles(spinner: Ora) {
  const titlesAndCategories = getArticleData();

  const posts = [];

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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const postEn: any = {
      ...basePost,
      categoryLocal: category,
      slug: slugify(title, { strict: true, lower: true }),
      locale: "en",
      title: response.title,
      summary: response.summary,
      intro: response.intro,
      content: response.content,
    };

    const postEs: any = {
      ...basePost,
      slug: slugify(await translateAPI.translate(response.title), {
        strict: true,
        lower: true,
      }),
      locale: "es",
      categoryLocal: await translateAPI.translate(category),
      title: await translateAPI.translate(response.title),
      summary: await translateAPI.translate(response.summary),
      intro: await translateAPI.translate(response.intro),
      content: await translateAPI.translate(response.content),
    };

    posts.push(postEn);
    posts.push(postEs);
  }

  const filePath = path.join(path.join(__dirname, "../"), `data.json`);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
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
