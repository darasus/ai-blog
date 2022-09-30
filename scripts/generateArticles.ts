import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import slugify from "slugify";
import path from "node:path";
import fs from "node:fs";
import { MDXPost } from "../types";
import parseMD from "parse-md";
import { readArticleFile } from "../node-utils/readArticleFile";
import { getArticleData } from "../node-utils/getArticleData";
import { formatMarkdown } from "../node-utils/formatMarkdown";
import { Writesonic } from "../lib/writesonic";
import { concurrently } from "../node-utils/concurrently";
import sharp from "sharp";
import { Dalle } from "../lib/dalle";
import { readArticleImageFile } from "../node-utils/readArticleImageFile";
import { imagesPath, postsPath } from "../node-utils/paths";

const spinner = ora("Start generating articles...").start();

export async function generateArticles() {
  const ai = new Writesonic();
  const titlesAndCategories = getArticleData();
  const promises = [];

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    const promise = async () => {
      spinner.text = `Generating article titled(${i + 1}/${
        titlesAndCategories.length
      }): ${title}`;

      let post: Partial<MDXPost> = {};

      const basename = slugify(title, { strict: true, lower: true });

      // existing content
      const originalSource = readArticleFile(basename + ".md");
      const { metadata, content } = parseMD(
        typeof originalSource !== "string" ? "" : originalSource
      ) as { metadata: MDXPost; content: string };

      // new content
      const response = await ai.generateArticle({
        title,
      });

      if (content.trim() === response.content.trim()) {
        post.title = metadata.title;
        post.createdAt = metadata.createdAt;
        post.updatedAt = metadata.updatedAt;
        post.category = metadata.category;
        post.summary = metadata.summary;
        post.intro = metadata.intro;
        post.content = content;
        if (!metadata.summary && response.summary) {
          post.summary = response.summary;
        }
      } else {
        if (metadata?.title && metadata?.createdAt) {
          post.title = metadata?.title;
          post.createdAt = metadata?.createdAt;
        } else {
          post.title = title;
          post.createdAt = new Date();
        }

        post.updatedAt = new Date();
        post.category = category;
        post.content = response?.content;
        post.summary = response?.summary;
        post.intro = response?.intro;
      }

      const image = readArticleImageFile(basename + ".png");

      if (image) {
        const img = sharp(image).resize(10);
        const base64url = (await img.toBuffer()).toString("base64");
        post.imageSrc = "/articles/" + basename + ".png";
        post.imageSrcBase64 = "data:image/png;base64," + base64url;
      } else {
        const dalle = new Dalle();
        const base64String = await dalle.generateImage(post.title);

        if (base64String) {
          fs.writeFileSync(
            path.join(imagesPath, `${basename}.png`),
            base64String,
            "base64"
          );
          post.imageSrc = "/articles/" + basename + ".png";
          const img = sharp(Buffer.from(base64String, "base64")).resize(10);
          const imageSrcBase64 = (await img.toBuffer()).toString("base64");
          post.imageSrcBase64 = "data:image/png;base64," + imageSrcBase64;
        } else {
          post.imageSrc = "";
          post.imageSrcBase64 = "";
        }
      }

      const formattedPost = formatMarkdown(post as MDXPost);
      const filePath = path.join(postsPath, `${basename}.md`);
      fs.writeFileSync(filePath, formattedPost);
    };

    promises.push(promise);
  }

  await concurrently(promises, 1);

  spinner.text = `Done generating ${titlesAndCategories.length} articles!`;
  process.exit(0);
}
