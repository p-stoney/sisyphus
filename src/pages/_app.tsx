import Head from "next/head";
import type { AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import AppBar from "~/components/AppBar";
import AppContainer from "~/components/AppContainer";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Sisyphus</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <AppContainer>
        <AppBar />
        <Component {...pageProps} />
      </AppContainer>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
