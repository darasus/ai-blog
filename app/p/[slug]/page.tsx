import { headers } from 'next/headers'
import { Divider } from '../../../components/Divider'
import { Meta } from '../../../components/Meta'
import { DetailedPost } from '../../../components/Post/DetailedPost'
import { PostListSection } from '../../../components/Post/PostListSection'
import { baseProductionUrl } from '../../../constants'
import { useTranslations } from '../../../hooks/useTranslations'
import { getPost } from '../../../node-utils/getPost'

export default function PostPage({ params }: any) {
  const headersList = headers()
  const locale = headersList.get('Accept-Language') as 'en' | 'es'
  const translations = useTranslations(locale)
  const post = getPost(params.slug)

  if (!post) return null

  const { title, summary, category, slug } = post

  return (
    <>
      <Meta
        title={title}
        description={`${summary.slice(0, 157).trim()}...`}
        imageSrc={encodeURI(
          `${baseProductionUrl}/api/og?title=${title}&category=${post.category}&imageSrc=${baseProductionUrl}${post.imageSrc}`
        )}
        slug={slug}
        structured={{
          ...(post.imageSrc
            ? { image: [`https://www.theaipaper.com${post.imageSrc}`] }
            : {}),
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
        }}
      />
      <DetailedPost post={post} />
      <Divider />
      <PostListSection
        title={translations['other.in.category'].replace(
          '{category}',
          category
        )}
        posts={post.relatedArticles}
      />
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: await generatePostPageStaticPaths(),
//     fallback: false,
//   }
// }

// export const config = {
//   unstable_excludeFiles: ['public/**/*'],
// }
