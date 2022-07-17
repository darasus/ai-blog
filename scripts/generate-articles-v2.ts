import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import slugify from "slugify";
import path from "node:path";
import fs from "node:fs";
import { MDXPost } from "../types/Post";
import parseMD from "parse-md";
import { readArticleFile } from "../utils/readFileSync";
import { getArticleData } from "./shared/getArticleData";
import { formatMarkdown } from "./shared/formatMarkdown";
import { Writesonic } from "../lib/writesonic";
import { allConcurrent } from "./shared/allConcurrent";

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
      const originalSource = readArticleFile(basename + ".md", "utf8");
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
