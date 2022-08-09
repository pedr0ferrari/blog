import "@fontsource/roboto-mono";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseProvider } from "../config/context";
import React from "react";
import Head from "next/head";
import theme from "../theme/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <FirebaseProvider>
      <ChakraProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseProvider>
  );
};

export default MyApp;
