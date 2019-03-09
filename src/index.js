import * as React from 'react'
import ReactDOM from 'react-dom'

import { Theme } from 'reactackle'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import reactackleThemeMixin from './theme'

import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('root element not found')
}

const customTheme = {}

const GlobalStyle = createGlobalStyle`
  :root {
    --spacing: 1rem;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  html {
    width: 100%;
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
  }
  body {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
`

ReactDOM.render(
  <Theme mixin={reactackleThemeMixin}>
    <ThemeProvider theme={customTheme}>
      <React.Fragment>
        <GlobalStyle />
        <App />
      </React.Fragment>
    </ThemeProvider>
  </Theme>
  , root
)