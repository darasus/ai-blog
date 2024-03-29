import { Meta } from '../../components/Meta'
import { DetailedPost } from '../../components/Post/DetailedPost'
import { PostListSection } from '../../components/Post/PostListSection'
import { GetStaticPaths, GetStaticProps } from 'next'
import { generatePostPageStaticPaths } from '../../node-utils/generateStaticPaths'
import { useTranslations } from '../../hooks/useTranslations'
import { baseProductionUrl } from '../../constants'
import { Divider } from '../../components/Divider'
import { cloudflareLoader } from '../../isomorphic-utils/cloudflareLoader'
import { prisma } from '../../lib/prisma'
import { Article, Locale } from '@prisma/client'

export default function Home({
  post,
  relatedArticles,
}: {
  post: Article
  relatedArticles: Article[]
}) {
  const translations = useTranslations()
  const { title, summary, category, slug } = post

  return (
    <>
      <Meta
        title={title}
        description={`${summary.slice(0, 157).trim()}...`}
        imageSrc={encodeURI(
          `${baseProductionUrl}/api/og?title=${title}&category=${
            post.category
          }&imageSrc=${cloudflareLoader({
            src: post.imageId,
            width: 1000,
            quality: 75,
          })}`
        )}
        slug={slug}
        structured={{
          ...(post.imageId
            ? {
                image: [
                  cloudflareLoader({
                    src: post.imageId,
                    width: 1000,
                    quality: 75,
                  }),
                ],
              }
            : {}),
          datePublished: post.createdAt.toISOString(),
          dateModified: post.updatedAt.toISOString(),
        }}
      />
      <DetailedPost post={post} />
      <Divider />
      <PostListSection
        title={translations['other.in.category'].replace(
          '{category}',
          category
        )}
        posts={relatedArticles}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await generatePostPageStaticPaths(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale
  const defaultLocale = ctx.defaultLocale as Locale
  const post = await prisma.article.findFirst({
    where: {
      slug: ctx.params?.slug as string,
      locale: locale,
    },
  })
  const relatedArticles = await prisma.article.findMany({
    take: 10,
    where: {
      category: post?.category,
      locale: locale,
      AND: {
        NOT: {
          id: post?.id,
        },
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      category: true,
      imageId: true,
      createdAt: true,
      updatedAt: true,
      intro: true,
      imageSrcBase64: true,
      locale: true,
    },
  })

  if (!post) return { notFound: true }

  return {
    props: {
      post,
      relatedArticles,
    },
  }
}
