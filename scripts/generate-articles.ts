import * as dotenv from "dotenv";

dotenv.config();

import ora from "ora";
import { articleTitles } from "../data/articleTitles";
import { AI } from "../lib/ai";
import yaml from "yaml";
import slugify from "slugify";
import path from "path";
import fs from "fs";

const spinner = ora("Start generating articles...");

const postsDir = path.join(__dirname, "../content");

interface Post {
  title: string;
  date: Date;
  body: string;
}

function getArticleTitles() {
  return articleTitles;
}

function formatMarkdown(post: Post) {
  const { body, ...rest } = post;
  return `---\n${yaml.stringify(rest)}---\n\n${body.trim()}\n`;
}

async function main() {
  spinner.start();
  const ai = new AI();
  const titles = getArticleTitles();

  for (const [i, title] of titles.entries()) {
    spinner.text = `Generating article (${i + 1} of ${
      titles.length
    }): ${title}`;
    const { response } = await ai
      .createCompletion(`Generate 1000 words article body titled "${title}"`)
      .then((response) => ({
        title,
        response,
      }));

    const post = {
      title,
      date: new Date(),
      body: response?.choices?.[0].text as string,
    };
    const formattedPost = formatMarkdown(post);
    const basename = slugify(post.title, { strict: true, lower: true });
    const filePath = path.join(postsDir, `${basename}.md`);
    fs.writeFileSync(filePath, formattedPost);
  }

  spinner.text = `Done generating ${titles.length} articles!`;
  spinner.stopAndPersist();
  process.exit(0);
}

main();
