import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { TPost } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const Post: React.FC<Props> = ({ post }) => {
  const { createdAt, title, category, content } = post;

  return (
    <article>
      <PostMeta items={[createdAt, capitalize(category)]} />
      <PostTitle>{title}</PostTitle>
      <MDXRemote {...content} />
    </article>
  );
};
