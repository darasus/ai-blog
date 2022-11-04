import { headers } from 'next/headers'
import { Divider } from '../../../../components/Divider'
import { Link } from '../../../../components/Link'
import { LinkButton } from '../../../../components/LinkButton'
import { Meta } from '../../../../components/Meta'
import { PostExcerpt } from '../../../../components/Post/PostExcerpt'
import { data } from '../../../../data/data'
import { useTranslations } from '../../../../hooks/useTranslations'
import { getPosts } from '../../../../node-utils/getPosts'
import { Category } from '../../../../types'

export default async function CategoryPosts({ params }: any) {
  const headersList = headers()
  const locale = headersList.get('Accept-Language') as 'en' | 'es'
  const translations = useTranslations(locale)
  const currentPage = Number(params.page)
  const category = params.category
  const { data, totalPages } = await getPosts({
    locale,
    page: currentPage,
    category,
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

export async function generateStaticParams() {
  let paths: any = []

  for (const category of Object.keys(data)) {
    const enPosts = await getPosts({
      locale: 'en',
      page: 1,
      category: category as Category,
    })
    const esPosts = await getPosts({
      locale: 'es',
      page: 1,
      category: category as Category,
    })
    const enPaths = Array.from({ length: enPosts.totalPages }).map((_, i) => ({
      page: `${i + 1}`,
      category,
      locale: 'en',
    }))
    const esPaths = Array.from({ length: esPosts.totalPages }).map((_, i) => ({
      page: `${i + 1}`,
      category,
      locale: 'es',
    }))

    paths = [...paths, ...enPaths, ...esPaths]
  }

  return paths
}

// export const config = {
//   unstable_excludeFiles: ['public/**/*'],
// }
