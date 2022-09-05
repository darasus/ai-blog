import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/future/image";
import React from "react";
import { TPost } from "../../types/Post";
import { capitalize } from "../../utils/capitalize";
import { PostMeta } from "./PostMeta";
import { PostTitle } from "./PostTitle";
import Link from "next/link";

interface Props {
  post: TPost;
}

export const GridPostExcerpt: React.FC<Props> = ({ post }) => {
  const { createdAt, category, title, intro, imageSrc, imageSrcBase64 } = post;

  return (
    <Link href={`/p/${post.slug}`}>
      <a className="break-inside block mb-4">
        <div className={clsx("w-full bg-white p-4 border")}>
          {imageSrc && (
            <div className={clsx("col-span-12 flex justify-center")}>
              <Image
                blurDataURL={imageSrcBase64}
                className="object-center object-cover"
                src={imageSrc}
                height={1000}
                width={1000}
                alt={title}
                placeholder="blur"
              />
            </div>
          )}
          <div>
            <div className="mt-1">
              <PostMeta items={[createdAt, capitalize(category)]} />
            </div>
            <PostTitle type="h2">{`${title}`}</PostTitle>
            <div className="px-1">
              <MDXRemote
                {...intro}
                components={{
                  p: ({ children }) => <p className="text-base">{children}</p>,
                }}
              />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
