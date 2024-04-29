import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  position: relative;
  padding: 0.1rem 0.75rem;

  @media (min-width: 768px) {
    padding: 3.5rem 3rem;
  }

  @media (min-width: 1024px) {
    padding: 4.5rem 3rem;
  }
`;

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent;
