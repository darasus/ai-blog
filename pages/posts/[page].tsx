import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { Divider } from '../../components/Divider'
import { Link } from '../../components/Link'
import { Meta } from '../../components/Meta'
import { Pagination } from '../../components/Pagination'
import { PostExcerpt } from '../../components/Post/PostExcerpt'
import { useTranslations } from '../../hooks/useTranslations'
import { generatePostsPageStaticPaths } from '../../node-utils/generateStaticPaths'
import { paginatePosts } from '../../node-utils/paginatePosts'

export default function Posts({
  data,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const translations = useTranslations()

  return (
    <>
      <Meta
        title={translations['latest']}
        description={translations['site.description']}
      />
      {data.map((post) => {
        return (
          <Link hoverStyles={false} href={`/p/${post.slug}`} key={post.id}>
            <PostExcerpt post={post} />
            <Divider />
          </Link>
        )
      })}
      <Pagination totalPages={pagination.pageCount} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await generatePostsPageStaticPaths(),
    fallback: false,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const response = await paginatePosts(ctx)

  return {
    props: {
      ...response,
    },
  }
}
