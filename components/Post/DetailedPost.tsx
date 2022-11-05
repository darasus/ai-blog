import Image from 'next/image'
import React from 'react'
import { cloudflareLoader } from '../../isomorphic-utils/cloudflareLoader'
import { Post } from '../../types'
import { Divider } from '../Divider'
import { Markdown } from '../Markdown'
import { PostMeta } from './PostMeta'
import { PostTitle } from './PostTitle'

interface Props {
  post: Post
}

export function DetailedPost({ post }: Props) {
  const {
    createdAt,
    title,
    categoryLocal,
    intro,
    content,
    summary,
    imageId,
    imageSrcBase64,
  } = post

  return (
    <article>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
        <div className="col-span-1">
          <div className="relative aspect-square">
            <Image
              loader={cloudflareLoader}
              blurDataURL={imageSrcBase64}
              src={imageId}
              alt={title}
              placeholder="blur"
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex items-start justify-center flex-col h-full">
            <PostMeta date={createdAt} category={categoryLocal} />
            <PostTitle>{title}</PostTitle>
          </div>
        </div>
      </div>
      <Divider />
      <div className="border-l-4 px-4 m-4">
        <span className="text-2xl text-gray-500 font-bold italic leading-relaxed">{`TL;DR: `}</span>
        <span className="text-2xl text-gray-500 italic leading-snug">
          {summary}
        </span>
      </div>
      <Divider />
      <div className="p-4">
        <Markdown {...intro} />
        <Markdown {...content} />
      </div>
    </article>
  )
}
