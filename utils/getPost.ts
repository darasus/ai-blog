import fs from "fs";
import matter from "gray-matter";
import capitalize from "capitalize";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { TPost } from "../types/Post";
import { POSTS_PATH } from "./paths";

export const getPost = async (filePath: string): Promise<TPost | null> => {
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  if (!source) return null;
  const { content, data } = matter(source);
  const mdxContent = await serialize(content);

  return {
    content: mdxContent,
    title: capitalize.words(data.title),
    createdAt: data.createdAt.toDateString(),
    updatedAt: data.updatedAt.toDateString(),
    category: data.category,
    slug: filePath.replace(/\.mdx?$/, ""),
    description: `${content.replaceAll("#", "").trim().slice(0, 400)}...`,
  };
};
