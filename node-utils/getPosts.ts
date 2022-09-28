import { paginateArray } from "paginate-array-ts";
import { numberOfPostsPerPage } from "../constants";
import { Category } from "../types";
import { TPost } from "../types";
import { getPost } from "./getPost";
import { postFilePaths } from "./postFilePaths";

export type PageInfo = ReturnType<typeof paginateArray<TPost>>;

export const getPosts = async (options?: {
  page?: number;
  numberOfItems?: number;
  order?: "desc" | "asc" | "random";
  category?: Category;
  excludeBySlug?: string[];
}): Promise<PageInfo> => {
  let posts: TPost[] = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    if (post) {
      posts.push(post);
    }
  }

  if (!options?.order || options?.order === "desc") {
    posts = posts
      .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map(({ date, ...post }) => ({ ...post }));
  }

  if (options?.order === "asc") {
    posts = posts
      .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reverse()
      .map(({ date, ...post }) => ({ ...post }));
  }

  if (options?.order === "random") {
    posts = posts
      .map((post) => ({ ...post, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...post }) => ({ ...post }));
  }

  if (options?.category) {
    posts = posts.filter((p) => p?.category === options?.category);
  }

  if (options?.excludeBySlug) {
    posts = posts.filter((p) => !options?.excludeBySlug?.includes(p?.slug));
  }

  return paginateArray<TPost>(
    posts,
    options?.page ?? 1,
    options?.numberOfItems ?? numberOfPostsPerPage
  );
};
