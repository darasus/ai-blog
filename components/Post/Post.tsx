import capitalize from "capitalize";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { TPost } from "../../types/Post";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const Post: React.FC<Props> = ({ post }) => {
  const { createdAt, title, category, intro, content, summary } = post;

  return (
    <article className="post">
      <PostMeta items={[createdAt, capitalize.words(category)]} />
      <PostTitle>{title}</PostTitle>
      <div className="border-l-4 pl-3 my-4 text-xl">
        <span className="font-bold">{`TL;DR: `}</span>
        <span>{summary}</span>
      </div>
      <MDXRemote {...intro} />
      <MDXRemote {...content} />
    </article>
  );
};
