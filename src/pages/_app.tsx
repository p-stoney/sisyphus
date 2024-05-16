import { api } from "~/utils/api";
import type { AppType, AppProps } from "next/app";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  SignInButton,
  ClerkLoaded,
} from "@clerk/nextjs";
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
        <SignedOut>
          <header className="flex min-h-screen flex-col justify-center">
            <div className="border-eee9da-400 flex justify-center self-center border p-4">
              <SignInButton />
            </div>
          </header>
        </SignedOut>
        <SignedIn>
          <Toaster position="top-center" />
          <AppContainer $ismobile={isMobile}>
            <AppBar />
            <ClerkLoaded>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </ClerkLoaded>
          </AppContainer>
        </SignedIn>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
