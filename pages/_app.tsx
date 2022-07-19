import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { FirebaseProvider } from "../config/context";
import React from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <FirebaseProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseProvider>
  );
};

export default MyApp;
