import { Locale } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'
import { getPosts, getRawPosts } from '../node-utils/getPosts'

export async function generateSitemap() {
  console.log(`🗺 Start generating sitemap...`)
  const BASE_URL = 'https://www.theaipaper.com'
  const posts = await getRawPosts()
  const paths: { url: string; updatedAt: string; locale: Locale }[] = []

  const orderedPosts = posts
    .map((post: any) => ({
      ...post,
      date: new Date(post?.createdAt as string),
    }))
    .sort((a: any, b: any) => b.date.getTime() - a.date.getTime())
    .map(({ date, ...post }: any) => post)

  for (const post of orderedPosts) {
    paths.push({
      url: `${BASE_URL}/${post.locale !== 'en' ? `${post.locale}/` : ''}p/${
        post.slug
      }`,
      updatedAt: `${post.updatedAt}`,
      locale: post.locale,
    })
  }

  const enPosts = await getPosts({
    locale: 'en',
    page: 1,
  })
  const esPosts = await getPosts({
    locale: 'es',
    page: 1,
  })

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}/</loc>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${paths
        .map((item) => {
          return `
            <url>
              <loc>${item.url}</loc>
              <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `.trim()
        })
        .join('')}
        ${Array.from({ length: enPosts.totalPages })
          .map((_, i) => {
            const posts = orderedPosts.filter(
              (post: any) => post.locale === 'en'
            )
            return `
            <url>
              <loc>${BASE_URL}/posts/${i + 1}</loc>
              <lastmod>${new Date(
                posts[posts.length - 1].updatedAt
              ).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
          })
          .join('')}
          ${Array.from({ length: esPosts.totalPages })
            .map((_, i) => {
              const posts = orderedPosts.filter(
                (post: any) => post.locale === 'es'
              )
              return `
                <url>
                  <loc>${BASE_URL}/es/posts/${i + 1}</loc>
                  <lastmod>${new Date(
                    posts[posts.length - 1].updatedAt
                  ).toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `
            })
            .join('')}
      </urlset>
    `.trim()

  const filePath = path.join(__dirname, '../sitemap.ts')
  fs.writeFileSync(filePath, `export const sitemap = \`${sitemap}\``)
  console.log(`✅ Done generating sitemap.`)
}
