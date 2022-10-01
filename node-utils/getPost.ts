import { Post } from "../types";
import { capitalize } from "../isomorphic-utils/capitalize";
import { readFileSync } from "fs";
import path from "path";
import { postsPath } from "./paths";

export const getPost = async (slug: string): Promise<Post | null> => {
  const post = JSON.parse(
    readFileSync(path.join(postsPath, `${slug}.json`), "utf8")
  ) as Post;

  if (!post) return null;

  return {
    ...post,
    createdAt: new Date(post.createdAt).toDateString(),
    updatedAt: new Date(post.updatedAt).toDateString(),
    title: capitalize(post.title),
  };
};
