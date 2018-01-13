/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import StreamPage from './containers/StreamPage'

const root = document.getElementById('app')

if (root) {
  ReactDOM.render(
    <MuiThemeProvider>
      <StreamPage />
    </MuiThemeProvider>,
    root
  )
} else {
  throw new Error('Application root element can not be found!')
}
