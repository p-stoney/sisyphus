import { api } from "~/utils/api";
import type { AppType, AppProps } from "next/app";
import { useMediaQuery, useTheme } from "@mui/material";
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import AppBar from "~/components/common/AppBar";
import GlobalStyles from "~/styles/GlobalStyles";
import PageLayout from "~/components/common/PageLayout";
import "~/styles/globals.css";

interface AppContainerProps {
  $ismobile: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: ${({ $ismobile }) => ($ismobile ? "column" : "row")};
`;

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <GlobalStyles />
      <ClerkProvider {...pageProps}>
        <Toaster position="top-center" />
        <AppContainer $ismobile={isMobile}>
          <AppBar />
          <ClerkLoaded>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </ClerkLoaded>
        </AppContainer>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
