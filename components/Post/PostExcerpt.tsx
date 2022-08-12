import capitalize from "capitalize";
import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/future/image";
import React from "react";
import { TPost } from "../../types/Post";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";

interface Props {
  post: TPost;
}

export const PostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, intro, slug, imageSrc } = post;

  return (
    <div
      className={clsx(
        "w-full grid gap-6 items-start grid-cols-12",
        "lg:gap-x-5"
      )}
    >
      {imageSrc && (
        <div
          className={clsx(
            "aspect-w-2 aspect-h-2 col-span-12 flex justify-center",
            "sm:col-span-4"
          )}
        >
          <Image
            className="object-center object-cover"
            src={imageSrc}
            height={400}
            width={400}
            alt={title}
          />
        </div>
      )}
      <div
        className={clsx("col-span-12", "sm:col-span-8", {
          "sm:col-span-12": !imageSrc,
        })}
      >
        <PostMeta items={[createdAt, capitalize.words(category)]} />
        <PostTitle type="h2">{`${title}`}</PostTitle>
        <div className="px-1">
          <MDXRemote {...intro} />
        </div>
      </div>
    </div>
  );
};
