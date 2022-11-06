import { GetServerSideProps } from 'next'
import { prisma } from '../lib/prisma'

const Sitemap = () => {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml')
  const posts = await prisma.article.findMany()

  res.write(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.theaipaper.com/</loc>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
        ${posts.map((post) => {
          return `
            <url>
              <loc>https://www.theaipaper.com/${
                post.locale === 'en' ? '' : 'es/'
              }p/${post.slug}</loc>
              <lastmod>${post.updatedAt.toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })}
      </urlset>
  `)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
