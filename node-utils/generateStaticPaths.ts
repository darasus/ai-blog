import { Category } from '@prisma/client'
import { prisma } from '../lib/prisma'

export async function generatePostPageStaticPaths() {
  const posts = await prisma.article.findMany()
  const res = posts.map((post) => ({
    params: { slug: post.slug },
    locale: post.locale,
  }))

  return res
}

export async function generatePostsPageStaticPaths() {
  const enPostsLength = await prisma.article.count({
    where: {
      locale: 'en',
    },
  })
  const esPostsLength = await prisma.article.count({
    where: {
      locale: 'es',
    },
  })
  const enPaths = Array.from({ length: Math.ceil(enPostsLength / 10) }).map(
    (_, i) => ({
      params: { page: `${i + 1}` },
      locale: 'en',
    })
  )
  const esPaths = Array.from({ length: Math.ceil(esPostsLength / 10) }).map(
    (_, i) => ({
      params: { page: `${i + 1}` },
      locale: 'es',
    })
  )

  return [...enPaths, ...esPaths]
}

export async function generateCategoryPageStaticPaths() {
  let paths: any = []

  for (const category of Object.keys(Category)) {
    const enPostsLength = await prisma.article.count({
      where: {
        locale: 'en',
        category: category as Category,
      },
    })
    const esPostsLength = await prisma.article.count({
      where: {
        locale: 'es',
        category: category as Category,
      },
    })
    const enPaths = Array.from({ length: Math.ceil(enPostsLength / 10) }).map(
      (_, i) => ({
        params: { page: `${i + 1}`, category },
        locale: 'en',
      })
    )
    const esPaths = Array.from({ length: Math.ceil(esPostsLength / 10) }).map(
      (_, i) => ({
        params: { page: `${i + 1}`, category },
        locale: 'es',
      })
    )

    paths = [...paths, ...enPaths, ...esPaths]
  }

  return paths
}
