import capitalize from "capitalize";
import React from "react";
import { TPost } from "../../types/Post";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const PostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, summary } = post;

  return (
    <>
      <PostMeta items={[createdAt, capitalize.words(category)]} />
      <PostTitle type="h2">{`${title}`}</PostTitle>
      <div className="px-1">{summary}</div>
    </>
  );
};
