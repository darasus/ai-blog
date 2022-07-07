import React from "react";
import { TPost } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const PostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, description } = post;

  return (
    <>
      <PostMeta items={[createdAt, capitalize(category)]} />
      <PostTitle type="h2">{`${title}`}</PostTitle>
      <div className="px-1">{description}</div>
    </>
  );
};
