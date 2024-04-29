import Head from "next/head";
import type { AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import AppBar from "~/components/AppBar";
import MainLayout from "~/components/PageLayout";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "~/styles/globals.css";

interface AppContainerProps {
  $ismobile: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: ${({ $ismobile }) => ($ismobile ? "column" : "row")};
`;

const MyApp: AppType = ({ Component, pageProps }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Sisyphus</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <AppContainer $ismobile={isMobile}>
        <AppBar />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppContainer>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
