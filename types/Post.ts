import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXPost {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  category: string;
}

export interface TPost {
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  description: string;
  slug: string;
}
