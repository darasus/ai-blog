import capitalize from "capitalize";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/future/image";
import React from "react";
import { TPost } from "../../types/Post";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const Post: React.FC<Props> = ({ post }) => {
  const { createdAt, title, category, intro, content, summary, imageSrc } =
    post;

  return (
    <article className="post">
      {imageSrc && (
        <div className="flex justify-center mb-4">
          <Image
            className="object-center object-cover"
            src={imageSrc}
            height={500}
            width={500}
            alt={title}
            loading="eager"
          />
        </div>
      )}
      <PostMeta items={[createdAt, capitalize.words(category)]} />
      <PostTitle>{title}</PostTitle>
      <div className="border-l-4 pl-4 my-4 text-2xl text-gray-500">
        <span className="font-bold">{`TL;DR: `}</span>
        <span>{summary}</span>
      </div>
      <MDXRemote {...intro} />
      <MDXRemote {...content} />
    </article>
  );
};
