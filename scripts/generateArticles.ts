import { Writesonic } from '../lib/writesonic'
import slugify from 'slugify'
import sharp from 'sharp'
import { Translate } from '../lib/translate'
import { serializeMarkdown } from '../node-utils/serializeMarkdown'
import { OpenAI } from '../lib/openai'
import { CloudflareImage } from '../lib/cloudflare-image'
import { Article, Category, Locale } from '@prisma/client'
import { prisma } from '../lib/prisma'

const ai = new Writesonic()
const openai = new OpenAI()
const translateAPI = new Translate()
const cloudflareImages = new CloudflareImage()

const data: Array<{ category: Category; title: string }> = [
  {
    category: 'cooking',
    title: 'How to make a delicious cake',
  },
]

type ArticleForm = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>

export async function generateArticles() {
  const allImages = await cloudflareImages.getAllImages()

  for (const { category, title } of data) {
    console.log(`Generating content for ${title}...`)

    console.log('Creating slugs...')
    const slug: Record<Locale, string> = {
      en: slugify(title, { strict: true, lower: true }),
      es: slugify(await translateAPI.translate(title), {
        strict: true,
        lower: true,
      }),
    }

    console.log('Generating content...')
    const response = await ai.generateArticle({
      title,
    })

    console.log('Generating image...')
    const { imageSrcBase64, imageId } = await generateAndWriteImage(
      title,
      allImages
    )

    const basePost = {
      category,
      imageSrcBase64,
      imageId,
    }

    const post: Record<Locale, ArticleForm> = {
      en: {
        ...basePost,
        slug: slug.en,
        locale: 'en',
        title,
        summary: response.summary,
        intro: JSON.stringify(await serializeMarkdown(response.intro)),
        content: JSON.stringify(await serializeMarkdown(response.content)),
      },
      es: {
        ...basePost,
        slug: slug.es,
        locale: 'es',
        title: await translateAPI.translate(response.title),
        summary: await translateAPI.translate(response.summary),
        intro: JSON.stringify(
          await serializeMarkdown(await translateAPI.translate(response.intro))
        ),
        content: JSON.stringify(
          await serializeMarkdown(
            await translateAPI.translate(response.content)
          )
        ),
      },
    }

    console.log('Saving article...')
    await prisma.article.createMany({
      data: [post.en, post.es],
    })
  }
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
    const cachedImage = await cloudflareImages.uploadImage(
      imageBuffer,
      `${basename}.png`
    )

    imageId = cachedImage.id

    const srcBase64 = imageBuffer.toString('base64')
    imageSrcBase64 = 'data:image/png;base64,' + srcBase64
  }

  return { imageSrcBase64, imageId }
}
