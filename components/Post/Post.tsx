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
  const { createdAt, title, category, content } = post;

  return (
    <article className="post">
      <PostMeta items={[createdAt, capitalize.words(category)]} />
      <PostTitle>{title}</PostTitle>
      <MDXRemote {...content} />
    </article>
  );
};
