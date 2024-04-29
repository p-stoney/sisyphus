import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainLayout;

// import type { PropsWithChildren } from "react";

// export const PageLayout = (props: PropsWithChildren) => {
//   return (
//     <main className="overflow-none flex h-screen justify-center">
//       <div className="flex h-screen flex-col">{props.children}</div>
//     </main>
//   );
// };

// export const PageLayout = (props: PropsWithChildren) => {
//   return (
//     <main className="overflow-none flex h-screen justify-center">
//       <div className="flex h-full w-full flex-col border-x border-slate-400 md:max-w-2xl">
//         {props.children}
//       </div>
//     </main>
//   );
// };
// <div className="flex flex-col min-h-screen flex-grow">
