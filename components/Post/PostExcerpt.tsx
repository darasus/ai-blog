import capitalize from "capitalize";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { TPost } from "../../types/Post";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const PostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, intro } = post;

  return (
    <>
      <PostMeta items={[createdAt, capitalize.words(category)]} />
      <PostTitle type="h2">{`${title}`}</PostTitle>
      <div className="px-1">
        <MDXRemote {...intro} />
      </div>
    </>
  );
};
