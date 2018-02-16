// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

import { injectGlobal } from 'styled-components'

import App from './containers/App'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Application root element can not be found!')
}

ReactDOM.render(<App />, root)

injectGlobal`
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
  }
`
