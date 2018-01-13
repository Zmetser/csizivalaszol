// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { injectGlobal } from 'styled-components'

import Container from './components/Container'
import StreamPage from './containers/StreamPage'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Application root element can not be found!')
}

ReactDOM.render(
  <Router>
    <Container>
      <Route exact path='/' component={StreamPage} />
    </Container>
  </Router>
  ,
  root
)

injectGlobal`
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
  }
`
