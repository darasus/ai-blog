import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ intlMessages: Record<string, string> }>) {
  return (
    <>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  )
}

export default MyApp
