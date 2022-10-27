import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { Analytics } from '@vercel/analytics/react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ intlMessages: Record<string, string> }>) {
  const { locale, defaultLocale } = useRouter()

  return (
    <>
      <IntlProvider
        locale={locale as string}
        defaultLocale={defaultLocale}
        messages={pageProps.intlMessages}
      >
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
      <Analytics />
    </>
  )
}

export default MyApp
