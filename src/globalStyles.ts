import { createGlobalStyle } from 'styled-components'

export const WIDTH_DISPLAY = '1280'
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: Lexend Deca, serif;
  }

  @media (max-width: 790px) {
    body, html {
      font-size: 12px;
    }

    .container {
      padding: 10px;
    }
  }
`
