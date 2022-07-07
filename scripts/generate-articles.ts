import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import { data } from "../data/data";
import { AI } from "../lib/ai";
import yaml from "yaml";
import slugify from "slugify";
import path from "node:path";
import fs from "node:fs";
import { MDXPost } from "../types/Post";
import parseMD from "parse-md";
import { readArticleFile } from "../utils/readFileSync";
import { keys } from "ramda";

const spinner = ora("Start generating articles...");

const postsDir = path.join(__dirname, "../content");

interface Input {
  title: string;
  category: string;
}

function getArticleData() {
  return keys(data).reduce<Input[]>((prev, next) => {
    const articles = data[next];
    const newData = articles.map((title) => ({ title, category: next }));
    return [...prev, ...newData];
  }, []);
}

function formatMarkdown(post: MDXPost) {
  const { content, ...rest } = post;
  return `---\n${yaml.stringify(rest)}---\n\n${content.trim()}\n`;
}

async function main() {
  spinner.start();
  const ai = new AI();
  const titlesAndCategories = getArticleData();

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    spinner.text = `Generating article (${i + 1} of ${
      titlesAndCategories.length
    }): ${title}`;
    let post: Partial<MDXPost> = {};
    const basename = slugify(title, { strict: true, lower: true });
    // existing content
    const originalSource = readArticleFile(basename + ".md", "utf8");
    const { metadata } = parseMD(
      typeof originalSource !== "string" ? "" : originalSource
    ) as { metadata: MDXPost };
    // new content
    const { response } = await ai
      .createCompletion(`Generate 1000 words article body titled "${title}"`)
      .then((response) => ({
        title,
        response,
      }));

    if (metadata?.title && metadata?.createdAt) {
      post.title = metadata?.title;
      post.createdAt = metadata?.createdAt;
    } else {
      post.title = title;
      post.createdAt = new Date();
    }

    post.updatedAt = new Date();
    post.content = response?.choices?.[0].text;
    post.category = category;

    const formattedPost = formatMarkdown(post as MDXPost);
    const filePath = path.join(postsDir, `${basename}.md`);
    fs.writeFileSync(filePath, formattedPost);
  }

  spinner.text = `Done generating ${titlesAndCategories.length} articles!`;
  spinner.stopAndPersist();
  process.exit(0);
}

main();
