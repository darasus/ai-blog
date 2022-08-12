import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import slugify from "slugify";
import path from "node:path";
import fs from "node:fs";
import { MDXPost } from "../types/Post";
import parseMD from "parse-md";
import { readArticleFile, readArticleImageFile } from "../utils/readFileSync";
import { getArticleData } from "./shared/getArticleData";
import { formatMarkdown } from "./shared/formatMarkdown";
import { Writesonic } from "../lib/writesonic";
import { allConcurrent } from "./shared/allConcurrent";
import sharp from "sharp";

const spinner = ora("Start generating articles...");

const postsDir = path.join(__dirname, "../content");

async function main() {
  spinner.start();
  spinner.text = "Generating articles...";
  const ai = new Writesonic();
  const titlesAndCategories = getArticleData();
  const promises = [];

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    const promise = async () => {
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
        const img = sharp(image).resize(50);
        const base64url = (await img.toBuffer()).toString("base64");
        post.imageSrc = "/articles/" + basename + ".png";
        post.imageSrcBase64 = "data:" + base64url + ";base64,";
      } else {
        post.imageSrc = "";
        post.imageSrcBase64 = "";
      }

      const formattedPost = formatMarkdown(post as MDXPost);
      const filePath = path.join(postsDir, `${basename}.md`);
      fs.writeFileSync(filePath, formattedPost);
    };

    promises.push(promise);
  }

  await allConcurrent(20, promises);

  spinner.text = `Done generating ${titlesAndCategories.length} articles!`;
  spinner.stopAndPersist();
  process.exit(0);
}

main();
