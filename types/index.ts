import { data } from "../data/data";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Locale = "en" | "es";

export interface BasePost {
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
}

export interface Post extends BasePost {
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  intro: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export interface RawPost extends BasePost {
  content: string;
  intro: string;
}

export type Category = keyof typeof data;
