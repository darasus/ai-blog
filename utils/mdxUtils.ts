import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "content");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const getPost = async (filePath: string) => {
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  const { content, data } = matter(source);
  const mdxContent = await serialize(content);

  return {
    content: mdxContent,
    title: data.title,
    date: data.date.toDateString(),
    slug: filePath.replace(/\.mdx?$/, ""),
  };
};
