import * as dotenv from "dotenv";
import matter from "gray-matter";

dotenv.config();

import fs from "node:fs";
import path from "node:path";
import { postFilePaths } from "../utils/mdxUtils";
import { POSTS_PATH } from "../utils/paths";

const getPost = (filePath: string) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  if (!source) return null;
  const { data } = matter(source);
  return {
    slug: filePath.replace(/\.mdx?$/, ""),
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
};

async function main() {
  const BASE_URL = "https://www.theaipaper.com";
  const posts = [];
  const paths: { url: string; updatedAt: string }[] = [];

  for (const filePath of postFilePaths) {
    const post = getPost(filePath);
    posts.push(post);
  }

  const orderedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => post);

  for (const post of orderedPosts) {
    paths.push({
      url: `${BASE_URL}/p/${post?.slug}`,
      updatedAt: `${post?.updatedAt}`,
    });
  }

  const numberOfPages = Math.floor(paths.length / 10);

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}/</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${paths
        .map(({ url, updatedAt }) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${Array.from({ length: numberOfPages })
          .map((_, i) => {
            return `
            <url>
              <loc>${BASE_URL}/posts/${i + 1}</loc>
              <lastmod>${new Date(
                orderedPosts[orderedPosts.length - 1].updatedAt
              ).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
      </urlset>
    `.trim();

  const filePath = path.join(__dirname, "../sitemap.ts");
  fs.writeFileSync(filePath, `export const sitemap = \`${sitemap}\``);
}

main();
