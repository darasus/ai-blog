import { paginateArray } from "paginate-array-ts";
import { numberOfPostsPerPage } from "../constants";
import { Category, Locale, RawPost } from "../types";
import { Post } from "../types";
import { serialize } from "next-mdx-remote/serialize";
import { capitalize } from "../isomorphic-utils/capitalize";
import { readdir, readFileSync } from "fs";
import { postsPath } from "./paths";
import path, { resolve } from "path";

export type PageInfo = ReturnType<typeof paginateArray<Post>>;

export const getPosts = async (options: {
  locale: Locale | "all";
  page?: number;
  numberOfItems?: number;
  order?: "desc" | "asc" | "random";
  category?: Category;
  excludeBySlug?: string[];
}): Promise<PageInfo> => {
  const rawPosts = await getRawPosts();
  let posts: Post[] = await Promise.all(
    rawPosts.map(async (post) => {
      return {
        ...post,
        content: await serialize(post.content, {
          // parseFrontmatter: false,
          mdxOptions: {
            // remarkRehypeOptions: {},
          },
        }),
        intro: await serialize(post.intro, {
          // parseFrontmatter: false,
          mdxOptions: {
            // remarkRehypeOptions: {},
          },
        }),
      };
    })
  );

  if (options.locale !== "all") {
    posts = posts.filter((post) => post.locale === options.locale);
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

  posts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt).toDateString(),
    updatedAt: new Date(post.updatedAt).toDateString(),
    title: capitalize(post.title),
  }));

  return paginateArray<Post>(
    posts,
    options?.page ?? 1,
    options?.numberOfItems ?? numberOfPostsPerPage
  );
};

export const getRawPosts = (): Promise<RawPost[]> => {
  return new Promise((resolve, reject) => {
    const posts: RawPost[] = [];

    readdir(postsPath, (err, files) => {
      if (err) {
        return reject(new Error("Unable to scan directory: " + err));
      }

      for (const file of files) {
        const data = readFileSync(path.join(postsPath, file), "utf8");

        posts.push(JSON.parse(data));
      }

      return resolve(posts);
    });
  });
};
