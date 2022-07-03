import * as dotenv from "dotenv";

dotenv.config();

import { articleTitles } from "../data/articleTitles";
import { AI } from "../lib/ai";
import yaml from "yaml";
import slugify from "slugify";
import path from "path";
import fs from "fs";

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
  const ai = new AI();
  const titles = getArticleTitles();

  for (const title of titles) {
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
    console.log("Done".green);
  }
}

main();
