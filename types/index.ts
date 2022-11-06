import { data } from '../data/data'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Locale } from '@prisma/client'

export interface BasePost {
  title: string
  locale: Locale
  category: Category
  categoryLocal: string
  createdAt: string
  updatedAt: string
  slug: string
  imageId: string
  imageSrcBase64: string
  intro: MDXRemoteSerializeResult<Record<string, unknown>>
}

export interface Post extends BasePost {
  content: MDXRemoteSerializeResult<Record<string, unknown>>
  relatedArticles: Omit<BasePost, 'relatedArticles'>[]
  summary: string
}

export type Category = keyof typeof data
