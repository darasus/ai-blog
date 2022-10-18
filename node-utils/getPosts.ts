import { paginateArray } from 'paginate-array-ts'
import { numberOfPostsPerPage } from '../constants'
import { Category, Locale, BasePost } from '../types'
import { Post } from '../types'
import { capitalize } from '../isomorphic-utils/capitalize'
import { readdir, readFileSync } from 'fs'
import { postsPath } from './paths'
import path from 'path'

export type PageInfo = ReturnType<typeof paginateArray<BasePost>>

export const getPosts = async (options: {
  locale: Locale | 'all'
  page?: number
  numberOfItems?: number
  order?: 'desc' | 'asc' | 'random'
  category?: Category
  excludeBySlug?: string[]
}): Promise<PageInfo> => {
  let posts = await (
    await getRawPosts()
  ).map(({ content, summary, relatedArticles, ...post }) => post)

  if (options.locale !== 'all') {
    posts = posts.filter((post) => post.locale === options.locale)
  }

  if (!options?.order || options?.order === 'desc') {
    posts = posts
      .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map(({ date, ...post }) => ({ ...post }))
  }

  if (options?.order === 'asc') {
    posts = posts
      .map((post) => ({ ...post, date: new Date(post?.createdAt as string) }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reverse()
      .map(({ date, ...post }) => ({ ...post }))
  }

  if (options?.order === 'random') {
    posts = posts
      .map((post) => ({ ...post, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...post }) => ({ ...post }))
  }

  if (options?.category) {
    posts = posts.filter((p) => p?.category === options?.category)
  }

  if (options?.excludeBySlug) {
    posts = posts.filter((p) => !options?.excludeBySlug?.includes(p?.slug))
  }

  posts = posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt).toDateString(),
    updatedAt: new Date(post.updatedAt).toDateString(),
    title: capitalize(post.title),
  }))

  return paginateArray<BasePost>(
    posts,
    options?.page ?? 1,
    options?.numberOfItems ?? numberOfPostsPerPage
  )
}

export const getRawPosts = (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    const posts: Post[] = []

    readdir(postsPath, (err, files) => {
      if (err) {
        return reject(new Error('Unable to scan directory: ' + err))
      }

      for (const file of files) {
        const data = readFileSync(path.join(postsPath, file), 'utf8')

        posts.push(JSON.parse(data))
      }

      return resolve(posts)
    })
  })
}
