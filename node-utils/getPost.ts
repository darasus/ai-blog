import { serialize } from "next-mdx-remote/serialize";
import { Post } from "../types";
import { capitalize } from "../isomorphic-utils/capitalize";
import { getRawPosts } from "./getPosts";

export const getPost = async (slug: string): Promise<Post | null> => {
  const rawPost = (await getRawPosts()).find((post: any) => post.slug === slug);

  if (!rawPost) return null;

  return {
    ...rawPost,
    content: await serialize(rawPost.content, {
      // parseFrontmatter: false,
      mdxOptions: {
        // remarkRehypeOptions: {},
      },
    }),
    intro: await serialize(rawPost.intro, {
      // parseFrontmatter: false,
      mdxOptions: {
        // remarkRehypeOptions: {},
      },
    }),
    createdAt: new Date(rawPost.createdAt).toDateString(),
    updatedAt: new Date(rawPost.updatedAt).toDateString(),
    title: capitalize(rawPost.title),
  };
};
