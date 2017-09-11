/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import StreamPage from './containers/StreamPage'

ReactDOM.render(
  <MuiThemeProvider>
    <StreamPage />
  </MuiThemeProvider>,
  document.getElementById('app')
)
