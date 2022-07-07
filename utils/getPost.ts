import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { Post } from "../types/Post";
import { capitalize } from "./capitalize";
import { POSTS_PATH } from "./paths";

export const getPost = async (filePath: string): Promise<Post | null> => {
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  if (!source) return null;
  const { content, data } = matter(source);
  const mdxContent = await serialize(content);

  return {
    content: mdxContent,
    title: capitalize(data.title),
    createdAt: data.createdAt.toDateString(),
    updatedAt: data.updatedAt.toDateString(),
    category: data.category,
    slug: filePath.replace(/\.mdx?$/, ""),
    description: `${content.trim().slice(0, 200)}...`,
  };
};
