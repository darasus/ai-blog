import { data } from "../data/data";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Locale = "en" | "es";

export interface Post {
  title: string;
  summary: string;
  locale: Locale;
  category: Category;
  categoryLocal: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  imageSrc: string;
  imageSrcBase64: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  intro: MDXRemoteSerializeResult<Record<string, unknown>>;
  relatedArticles: Omit<Post, "relatedArticles" | "content">[];
}

export type Category = keyof typeof data;
