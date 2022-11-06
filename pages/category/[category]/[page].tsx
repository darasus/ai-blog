import { Locale } from '@prisma/client'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Divider } from '../../../components/Divider'
import { Link } from '../../../components/Link'
import { LinkButton } from '../../../components/LinkButton'
import { Meta } from '../../../components/Meta'
import { PostExcerpt } from '../../../components/Post/PostExcerpt'
import { useTranslations } from '../../../hooks/useTranslations'
import { loadIntlMessages } from '../../../isomorphic-utils/loadIntlMessages'
import { generateCategoryPageStaticPaths } from '../../../node-utils/generateStaticPaths'
import { paginatePosts } from '../../../node-utils/paginatePosts'

export default function CategoryPosts({
  data,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const currentPage = Number(router.query.page)
  const category = String(router.query.category)
  const translations = useTranslations()

  return (
    <>
      <Meta
        title={translations.latest()}
        description={translations.siteDescription()}
      />
      {data.map((post, i: number) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={i}>
            <PostExcerpt post={post} />
            <Divider />
          </Link>
        )
      })}
      {pagination.pageCount > 1 && (
        <div className="flex bg-white p-4 items-center">
          <div className="flex grow">
            {currentPage !== 1 && (
              <LinkButton href={`/category/${category}/${currentPage - 1}`}>
                Previous
              </LinkButton>
            )}
            <div className="grow" />
            {currentPage !== pagination.pageCount && (
              <LinkButton href={`/category/${category}/${currentPage + 1}`}>
                Next
              </LinkButton>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await generateCategoryPageStaticPaths(),
    fallback: false,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const locale = ctx.locale as Locale
  const defaultLocale = ctx.defaultLocale as Locale
  const response = await paginatePosts(ctx)

  return {
    props: {
      ...response,
      intlMessages: await loadIntlMessages(locale, defaultLocale),
    },
  }
}
