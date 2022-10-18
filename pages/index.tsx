import { GetStaticProps } from 'next'
import { LinkButton } from '../components/LinkButton'
import { Meta } from '../components/Meta'
import { PostListSection } from '../components/Post/PostListSection'
import { useTranslations } from '../hooks/useTranslations'
import { loadIntlMessages } from '../isomorphic-utils/loadIntlMessages'
import { getPosts, PageInfo } from '../node-utils/getPosts'
import { Locale } from '../types'

export default function Home({ data }: PageInfo) {
  const translations = useTranslations()

  return (
    <>
      <Meta
        title={translations.latest()}
        description={translations.siteDescription()}
      />
      <PostListSection title={translations.latestArticles()} posts={data} />
      <div className="content-center py-5">
        <LinkButton href="/posts/2">{translations.seeMore()}</LinkButton>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale as Locale
  const defaultLocale = ctx.defaultLocale as Locale
  const props = await getPosts({
    locale,
    page: 1,
    numberOfItems: 10,
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
