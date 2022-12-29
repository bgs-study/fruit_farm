import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,body {
      height: 100vh;
    }
    
    html {
        font-size: 100%;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans KR', sans-serif;
    }

    ul, li {
      list-style: none;
    }

    a {
      text-decoration: none;
      display: block;
      color: #000;
      &:hover {
        color: #000;
    }
  }
`
export default GlobalStyle;
