import { LinkButton } from '../components/LinkButton'
import { Meta } from '../components/Meta'
import { PostListSection } from '../components/Post/PostListSection'
import { useTranslations } from '../hooks/useTranslations'
import { getPosts } from '../node-utils/getPosts'
import { headers } from 'next/headers'

export default async function HomePage() {
  const headersList = headers()
  const locale = headersList.get('Accept-Language') as 'en' | 'es'
  const translations = useTranslations(locale)
  const { data } = await getPosts({
    locale,
    page: 1,
    numberOfItems: 10,
  })

  return (
    <>
      <Meta
        title={translations['latest']}
        description={translations['site.description']}
      />
      <PostListSection title={translations['latest.articles']} posts={data} />
      <div className="flex justify-center py-5">
        <LinkButton href="/posts/2">{translations['see.more']}</LinkButton>
      </div>
    </>
  )
}
