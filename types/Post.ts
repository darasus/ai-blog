import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXPost {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export interface Post {
  title: string;
  createdAt: string;
  updatedAt: string;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  slug: string;
}
