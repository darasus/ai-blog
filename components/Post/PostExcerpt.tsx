import Image from 'next/image'
import React from 'react'
import { BasePost } from '../../types'
import { Markdown } from '../Markdown'
import { PostMeta } from './PostMeta'
import { PostTitle } from './PostTitle'

interface Props {
  post: BasePost
  loading?: 'lazy' | 'eager'
}

export function PostExcerpt({ post, loading = 'lazy' }: Props) {
  const { createdAt, categoryLocal, title, intro, imageSrc, imageSrcBase64 } =
    post

  return (
    <div className="grid gap-4 md:grid-cols-2 p-4">
      <div className="col-span-1">
        <div className="aspect-square relative">
          <Image
            blurDataURL={imageSrcBase64}
            src={imageSrc}
            alt={title}
            placeholder="blur"
            fill
            loading={loading}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="col-span-1">
        <PostMeta category={categoryLocal} date={createdAt} />
        <PostTitle type="h2">{`${title}`}</PostTitle>
        <div className="px-1">
          <Markdown {...intro} />
        </div>
      </div>
    </div>
  )
}
