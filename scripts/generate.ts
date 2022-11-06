import * as dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import sharp from 'sharp'
import { OpenAI } from '../lib/openai'
import { prisma } from '../lib/prisma'
import { getPosts, getRawPosts } from '../node-utils/getPosts'

dotenv.config()

import { generateArticles } from './generateArticles'
import { generateRelatedArticles } from './generateRelatedArticles'
import { generateSitemap } from './generateSitemap'

async function generate() {
  console.log('🚀 Start generating...')

  // for (const post of posts) {
  //   await prisma.article.create({
  //     data: {
  //       category: post.category,
  //       content: JSON.stringify(post.content),
  //       intro: JSON.stringify(post.intro),
  //       locale: post.locale,
  //       slug: post.slug,
  //       title: post.title,
  //       summary: post.summary,
  //       imageId: post.imageId,
  //       imageSrcBase64: post.imageSrcBase64,
  //     },
  //   })
  // }

  // await generateArticles()
  // await generateSitemap()

  console.log('✅ All done!')
  process.exit(0)
}

generate()
