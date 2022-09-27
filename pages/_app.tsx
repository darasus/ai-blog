import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import Head from "next/head";
import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    if (process.env.NODE_ENV === "production") {
      Fathom.load("UYYOEIHH", {
        includedDomains: ["www.theaipaper.com"],
        url: "https://events.theaipaper.com/script.js",
      });

      router.events.on("routeChangeComplete", onRouteChangeComplete);

      return () => {
        router.events.off("routeChangeComplete", onRouteChangeComplete);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
