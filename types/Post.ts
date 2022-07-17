import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXPost {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  category: string;
  summary: string;
}

export interface TPost {
  title: string;
  summary: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  slug: string;
}
