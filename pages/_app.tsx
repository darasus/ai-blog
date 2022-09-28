import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
