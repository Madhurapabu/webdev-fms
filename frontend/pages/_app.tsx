import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import Topbar from "../components/topbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Topbar/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
