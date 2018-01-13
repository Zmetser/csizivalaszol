/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'

import styled, { injectGlobal } from 'styled-components'

import StreamPage from './containers/StreamPage'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Application root element can not be found!')
}

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`

ReactDOM.render(
  <Container>
    <StreamPage />
  </Container >
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
