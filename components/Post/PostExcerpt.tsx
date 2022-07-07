import React from "react";
import { TPost } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { PostMeta } from "./PostMeta";

interface Props {
  post: TPost;
}

export const PostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, description } = post;

  return (
    <>
      <PostMeta items={[createdAt, capitalize(category)]} />
      <h2>{`${title}`}</h2>
      <span>{description}</span>
    </>
  );
};
