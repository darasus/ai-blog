import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Divider } from '../../../components/Divider'
import { Link } from '../../../components/Link'
import { LinkButton } from '../../../components/LinkButton'
import { Meta } from '../../../components/Meta'
import { PostExcerpt } from '../../../components/Post/PostExcerpt'
import { useTranslations } from '../../../hooks/useTranslations'
import { loadIntlMessages } from '../../../isomorphic-utils/loadIntlMessages'
import { generateCategoryPageStaticPaths } from '../../../node-utils/generateStaticPaths'
import { getPosts, PageInfo } from '../../../node-utils/getPosts'
import { Category, Locale } from '../../../types'

export default function CategoryPosts({ data, totalPages }: PageInfo) {
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
      {totalPages > 1 && (
        <div className="flex bg-white p-4 items-center">
          <div className="flex grow">
            {currentPage !== 1 && (
              <LinkButton href={`/category/${category}/${currentPage - 1}`}>
                Previous
              </LinkButton>
            )}
            <div className="grow" />
            {currentPage !== totalPages && (
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale
  const defaultLocale = ctx.defaultLocale as Locale
  const page = Number(ctx.params?.page)
  const category = String(ctx.params?.category) as Category
  const props = await getPosts({
    locale,
    page,
    category,
  })

  return {
    props: {
      ...props,
      intlMessages: await loadIntlMessages(locale, defaultLocale),
    },
  }
}

export const config = {
  unstable_excludeFiles: ['public/**/*'],
}
