import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import slugify from "slugify";
import path from "node:path";
import fs, { WriteStream } from "node:fs";
import { MDXPost } from "../types/Post";
import parseMD from "parse-md";
import { readArticleFile } from "../utils/readFileSync";
import { getArticleData } from "./shared/getArticleData";
import { formatMarkdown } from "./shared/formatMarkdown";
import { Writesonic } from "../lib/writesonic";

const spinner = ora("Start generating articles...");

const postsDir = path.join(__dirname, "../content");

async function main() {
  spinner.start();
  const ai = new Writesonic();
  const titlesAndCategories = getArticleData();

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    spinner.text = `Generating article (${i + 1} of ${
      titlesAndCategories.length
    }): ${title}`;
    let post: Partial<MDXPost> = {};
    const basename = slugify(title, { strict: true, lower: true });
    // existing content
    const originalSource = readArticleFile(basename + ".md", "utf8");
    const { metadata, content } = parseMD(
      typeof originalSource !== "string" ? "" : originalSource
    ) as { metadata: MDXPost; content: string };
    // new content
    const response = await ai.generateArticle({
      title: `Generate 1000 words article body titled "${title}"`,
    });

    if (content.trim() === response.content.trim()) {
      post.title = metadata.title;
      post.createdAt = metadata.createdAt;
      post.updatedAt = metadata.updatedAt;
      post.category = metadata.category;
      post.content = content;
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
    }

    const formattedPost = formatMarkdown(post as MDXPost);
    const filePath = path.join(postsDir, `${basename}.md`);
    fs.writeFileSync(filePath, formattedPost);
  }

  spinner.text = `Done generating ${titlesAndCategories.length} articles!`;
  spinner.stopAndPersist();
  process.exit(0);
}

main();
