import { serialize } from "next-mdx-remote/serialize";
import { TPost } from "../types";
import { capitalize } from "../isomorphic-utils/capitalize";
import postsData from "../data.json";

export const getPost = async (slug: string): Promise<TPost | null> => {
  const rawPost = (postsData as any).find((post: any) => post.slug === slug);

  return {
    ...rawPost,
    content: await serialize(rawPost.content, {
      parseFrontmatter: false,
      mdxOptions: {
        remarkRehypeOptions: {},
      },
    }),
    intro: await serialize(rawPost.intro, {
      parseFrontmatter: false,
      mdxOptions: {
        remarkRehypeOptions: {},
      },
    }),
    createdAt: new Date(rawPost.createdAt).toDateString(),
    updatedAt: new Date(rawPost.updatedAt).toDateString(),
    title: capitalize(rawPost.title),
  };
};
