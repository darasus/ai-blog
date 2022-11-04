import { headers } from 'next/headers'
import { Divider } from '../../../components/Divider'
import { Link } from '../../../components/Link'
import { Meta } from '../../../components/Meta'
import { Pagination } from '../../../components/Pagination'
import { PostExcerpt } from '../../../components/Post/PostExcerpt'
import { useTranslations } from '../../../hooks/useTranslations'
import { getPosts } from '../../../node-utils/getPosts'

export default async function PostsPage({ params }: any) {
  const headersList = headers()
  const locale = headersList.get('Accept-Language') as 'en' | 'es'
  const translations = useTranslations(locale)
  const currentPage = Number(params.page)
  const { data, totalPages } = await getPosts({
    locale,
    page: currentPage,
  })

  return (
    <>
      <Meta
        title={translations['latest']}
        description={translations['site.description']}
      />
      {data.map((post, i: number) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={i}>
            <PostExcerpt post={post} />
            <Divider />
          </Link>
        )
      })}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  )
}

export async function generateStaticParams() {
  const enPosts = await getPosts({
    locale: 'en',
    page: 1,
  })
  const esPosts = await getPosts({
    locale: 'es',
    page: 1,
  })
  const enPaths = Array.from({ length: enPosts.totalPages }).map((_, i) => ({
    page: `${i + 1}`,
    locale: 'en',
  }))
  const esPaths = Array.from({ length: esPosts.totalPages }).map((_, i) => ({
    page: `${i + 1}`,
    locale: 'es',
  }))

  return [...enPaths, ...esPaths]
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: await generatePostsPageStaticPaths(),
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const locale = ctx.locale as Locale
//   const defaultLocale = ctx.defaultLocale as Locale
//   const page = Number(ctx.params?.page as string)
//   const props = await getPosts({
//     locale,
//     page,
//   })

//   return {
//     props: {
//       ...props,
//       intlMessages: await loadIntlMessages(locale, defaultLocale),
//     },
//   }
// }

// export const config = {
//   unstable_excludeFiles: ['public/**/*'],
// }
