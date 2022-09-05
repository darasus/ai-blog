import { paginateArray } from "paginate-array-ts";
import { numberOfPostsPerPage } from "../constants";
import { TPost } from "../types/Post";
import { getPost } from "./getPost";
import { postFilePaths } from "./mdxUtils";

export type PageInfo = ReturnType<typeof paginateArray<TPost>>;

export const getPosts = async (options?: {
  page?: number;
  numberOfItems?: number;
}): Promise<PageInfo> => {
  const posts: TPost[] = [];

  for (const filePath of postFilePaths) {
    const post = await getPost(filePath);
    if (post) {
      posts.push(post);
    }
  }

  const orderedPosts = posts
    .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }) => ({ ...post }));

  return paginateArray<TPost>(
    orderedPosts,
    options?.page ?? 1,
    options?.numberOfItems ?? numberOfPostsPerPage
  );
};
