// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

import { Theme } from 'reactackle'

import { injectGlobal, ThemeProvider } from 'styled-components'
import reactackleThemeMixin from './theme'

import App from './containers/App'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Application root element can not be found!')
}

const customTheme = {}

ReactDOM.render(
  <Theme mixin={reactackleThemeMixin}>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </Theme>
  , root
)

injectGlobal`
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
