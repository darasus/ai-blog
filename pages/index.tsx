import { Locale } from '@prisma/client'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { LinkButton } from '../components/LinkButton'
import { Meta } from '../components/Meta'
import { PostListSection } from '../components/Post/PostListSection'
import { useTranslations } from '../hooks/useTranslations'
import { prisma } from '../lib/prisma'

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const translations = useTranslations()

  return (
    <>
      <Meta
        title={translations['latest']}
        description={translations['site.description']}
      />
      <PostListSection title={translations['latest.articles']} posts={posts} />
      <div className="flex justify-center py-5">
        <LinkButton href="/posts/2">{translations['see.more']}</LinkButton>
      </div>
    </>
  )
}

export const getStaticProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale as Locale

  const posts = await prisma.article.findMany({
    skip: 0,
    take: 10,
    where: {
      locale,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      category: true,
      imageId: true,
      imageSrcBase64: true,
      summary: true,
      locale: true,
      updatedAt: true,
      intro: true,
    },
  })

  return {
    props: {
      posts,
    },
  }
}
