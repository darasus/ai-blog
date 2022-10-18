import { Divider } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Link } from '../../components/Link'
import { Meta } from '../../components/Meta'
import { Pagination } from '../../components/Pagination'
import { PostExcerpt } from '../../components/Post/PostExcerpt'
import { useTranslations } from '../../hooks/useTranslations'
import { loadIntlMessages } from '../../isomorphic-utils/loadIntlMessages'
import { generatePostsPageStaticPaths } from '../../node-utils/generateStaticPaths'
import { getPosts, PageInfo } from '../../node-utils/getPosts'
import { Locale } from '../../types'

export default function Posts({ data, totalPages }: PageInfo) {
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
      <Pagination totalPages={totalPages} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await generatePostsPageStaticPaths(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale
  const defaultLocale = ctx.defaultLocale as Locale
  const page = Number(ctx.params?.page as string)
  const props = await getPosts({
    locale,
    page,
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
