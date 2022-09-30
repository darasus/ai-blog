import { data } from "../data/data";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXPost {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  category: string;
  summary: string;
  intro: string;
  imageSrc: string;
  imageSrcBase64: string;
}

export interface TPost {
  title: string;
  summary: string;
  locale: "en" | "es";
  intro: MDXRemoteSerializeResult<Record<string, unknown>>;
  category: Category;
  categoryLocal: string;
  createdAt: string;
  updatedAt: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  slug: string;
  imageSrc: string;
  imageSrcBase64: string;
}

export type Category = keyof typeof data;
