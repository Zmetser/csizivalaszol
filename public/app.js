/**
 * @flow
 */
import React from 'react'
import ReactDOM from 'react-dom'

import StreamPage from './containers/StreamPage'

const root = document.getElementById('app')

if (root) {
  ReactDOM.render(
    <StreamPage />,
    root
  )
} else {
  throw new Error('Application root element can not be found!')
}
