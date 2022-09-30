import { paginateArray } from "paginate-array-ts";
import { numberOfPostsPerPage } from "../constants";
import { Category, Locale } from "../types";
import { TPost } from "../types";
import postsData from "../data.json" assert { type: "json" };
import { serialize } from "next-mdx-remote/serialize";
import { capitalize } from "../isomorphic-utils/capitalize";

export type PageInfo = ReturnType<typeof paginateArray<TPost>>;

export const getPosts = async (options: {
  locale: Locale | "all";
  page?: number;
  numberOfItems?: number;
  order?: "desc" | "asc" | "random";
  category?: Category;
  excludeBySlug?: string[];
}): Promise<PageInfo> => {
  let posts: TPost[] = await Promise.all(
    (postsData as any).map(async (post: any) => {
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
    }) as TPost[]
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

  return paginateArray<TPost>(
    posts,
    options?.page ?? 1,
    options?.numberOfItems ?? numberOfPostsPerPage
  );
};
