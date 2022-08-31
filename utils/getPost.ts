import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { TPost } from "../types/Post";
import { capitalize } from "./capitalize";
import { POSTS_PATH } from "./paths";

export const getPost = async (filePath: string): Promise<TPost | null> => {
  const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  if (!source) return null;
  const { content, data } = matter(source);
  const mdxContent = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkRehypeOptions: {},
    },
  });
  const mdxIntro = await serialize(data.intro, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkRehypeOptions: {},
    },
  });

  return {
    content: mdxContent,
    title: capitalize(data.title),
    createdAt: data.createdAt.toDateString(),
    updatedAt: data.updatedAt.toDateString(),
    category: data.category,
    summary: data.summary,
    slug: filePath.replace(/\.mdx?$/, ""),
    intro: mdxIntro,
    imageSrc: data.imageSrc,
    imageSrcBase64: data.imageSrcBase64,
  };
};
