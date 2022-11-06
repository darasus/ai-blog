import { Locale } from '@prisma/client'
import { data } from '../data/data'
import { Category } from '../types'
import { getPosts, getRawPosts } from './getPosts'

type Res = Array<{
  params: { [key: string]: string }
  locale: Locale
}>

export async function generatePostPageStaticPaths() {
  const res = (await getRawPosts()).map((post: any) => ({
    params: { slug: post.slug as string },
    locale: post.locale,
  }))

  return res as Res
}

export async function generatePostsPageStaticPaths() {
  const enPosts = await getPosts({
    locale: 'en',
    page: 1,
  })
  const esPosts = await getPosts({
    locale: 'es',
    page: 1,
  })
  const enPaths = Array.from({ length: enPosts.totalPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
    locale: 'en',
  }))
  const esPaths = Array.from({ length: esPosts.totalPages }).map((_, i) => ({
    params: { page: `${i + 1}` },
    locale: 'es',
  }))

  return [...enPaths, ...esPaths] as Res
}

export async function generateCategoryPageStaticPaths() {
  let paths: any = []

  for (const category of Object.keys(data)) {
    const enPosts = await getPosts({
      locale: 'en',
      page: 1,
      category: category as Category,
    })
    const esPosts = await getPosts({
      locale: 'es',
      page: 1,
      category: category as Category,
    })
    const enPaths = Array.from({ length: enPosts.totalPages }).map((_, i) => ({
      params: { page: `${i + 1}`, category },
      locale: 'en',
    }))
    const esPaths = Array.from({ length: esPosts.totalPages }).map((_, i) => ({
      params: { page: `${i + 1}`, category },
      locale: 'es',
    }))

    paths = [...paths, ...enPaths, ...esPaths]
  }

  return paths
}
