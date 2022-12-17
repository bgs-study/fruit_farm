import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,body {
      height: 100%;
    }
    
    html {
        font-size: 100%;
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
    }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    display: block;
    color: #000;
  }
`
export default GlobalStyle;
