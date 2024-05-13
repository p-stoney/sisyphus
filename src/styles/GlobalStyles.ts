import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #6096B4;
    font-family: 'Spartan', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
`;

export default GlobalStyles;
