import path from 'path'
import fs from 'fs'
import { Writesonic } from '../lib/writesonic'
import { getArticleData } from '../node-utils/getArticleData'
import slugify from 'slugify'
import sharp from 'sharp'
import { Translate } from '../lib/translate'
import { Post } from '../types'
import { serializeMarkdown } from '../node-utils/serializeMarkdown'
import { omit } from 'ramda'
import { performance } from 'perf_hooks'
import isEqual from 'lodash/isEqual'
import ora from 'ora'
import { OpenAI } from '../lib/openai'
import { CloudflareImage } from '../lib/cloudflare-image'
import { getPosts } from '../node-utils/getPosts'
import { getPost } from '../node-utils/getPost'
import { Locale } from '@prisma/client'

const spinner = ora('Generating articles...')

const ai = new Writesonic()
const openai = new OpenAI()
const translateAPI = new Translate()
const cloudflareImages = new CloudflareImage()

export async function generateArticles() {
  spinner.start()
  const start = performance.now()
  const titlesAndCategories = getArticleData()
  const allImages = await cloudflareImages.getAllImages()

  console.log(
    `✏️  Generating article ${titlesAndCategories.length} articles...`
  )

  for (const [i, { title, category }] of titlesAndCategories.entries()) {
    spinner.text = `Generating articles (${i}/${titlesAndCategories.length}): ${title}...`
    const slug: Record<Locale, string> = {
      en: slugify(title, { strict: true, lower: true }),
      es: slugify(await translateAPI.translate(title), {
        strict: true,
        lower: true,
      }),
    }
    const response = await ai.generateArticle({
      title,
    })
    const originalPost: Record<Locale, Post | null> = {
      en: await getPost(slug.en),
      es: await getPost(slug.es),
    }

    const { imageSrcBase64, imageId } = await generateAndWriteImage(
      title,
      allImages
    )

    const basePost = {
      category,
      imageSrcBase64,
      imageId,
    }

    const post: Record<Locale, Post> = {
      en: {
        ...basePost,
        createdAt: originalPost.en?.createdAt ?? new Date().toISOString(),
        updatedAt: originalPost.en?.updatedAt ?? new Date().toISOString(),
        categoryLocal: category,
        slug: slug.en,
        locale: 'en',
        title,
        summary: response.summary,
        intro: await serializeMarkdown(response.intro),
        content: await serializeMarkdown(response.content),
        relatedArticles:
          originalPost?.en?.relatedArticles &&
          originalPost?.en?.relatedArticles?.length > 0
            ? originalPost.en?.relatedArticles
            : (
                await getPosts({
                  locale: 'en',
                  category,
                  excludeBySlug: [slug.en],
                  order: 'random',
                  numberOfItems: 10,
                })
              ).data,
      },
      es: {
        ...basePost,
        createdAt: originalPost.es?.createdAt ?? new Date().toISOString(),
        updatedAt: originalPost.es?.updatedAt ?? new Date().toISOString(),
        slug: slug.es,
        locale: 'es',
        categoryLocal: await translateAPI.translate(category),
        title: await translateAPI.translate(response.title),
        summary: await translateAPI.translate(response.summary),
        intro: await serializeMarkdown(
          await translateAPI.translate(response.intro)
        ),
        content: await serializeMarkdown(
          await translateAPI.translate(response.content)
        ),
        relatedArticles:
          originalPost?.es?.relatedArticles &&
          originalPost?.es?.relatedArticles?.length > 0
            ? originalPost.es?.relatedArticles
            : (
                await getPosts({
                  locale: 'es',
                  category,
                  excludeBySlug: [slug.en],
                  order: 'random',
                  numberOfItems: 10,
                })
              ).data,
      },
    }

    const isSameAsOriginal = isEqual(
      omit(['relatedArticles'], originalPost.en),
      omit(['relatedArticles'], post.en)
    )

    const contentPath = path.join(__dirname, '../content')

    if (!isSameAsOriginal) {
      const updatedAt = new Date().toISOString()
      const newPost: Record<Locale, Post> = {
        en: { ...post.en, updatedAt },
        es: { ...post.es, updatedAt },
      }
      for (const locale of Object.keys(newPost)) {
        const post = newPost[locale as Locale]
        fs.writeFileSync(
          path.join(contentPath, `${post.slug}.json`),
          JSON.stringify(post, null, 2)
        )
      }
    }
  }
  spinner.stop()
  const end = performance.now()
  console.log(
    `✅ Done generating ${titlesAndCategories.length} articles in ${
      (start - end) / 1000
    } seconds!`
  )
}

async function generateAndWriteImage(
  title: string,
  allImages: Record<string, string>
) {
  const basename = slugify(title, { strict: true, lower: true })
  const existingImageId = allImages[basename]

  let imageId = ''
  let imageSrcBase64 = ''

  if (existingImageId) {
    imageId = existingImageId

    const cachedImageBuffer = await cloudflareImages.getImageBuffer(
      existingImageId
    )
    const srcBase64 = await sharp(cachedImageBuffer).resize(10).png().toBuffer()
    imageSrcBase64 = 'data:image/png;base64,' + srcBase64.toString('base64')
  } else {
    const imageBuffer = await openai.createImage(title)
    const cachedImage = await cloudflareImages.uploadImage(imageBuffer)

    imageId = cachedImage.id

    const srcBase64 = imageBuffer.toString('base64')
    imageSrcBase64 = 'data:image/png;base64,' + srcBase64
  }

  return { imageSrcBase64, imageId }
}
