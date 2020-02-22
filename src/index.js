// @flow
import 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'

import App from './app'

const rootEl = document.getElementById('root')
if (rootEl) {
  render(<App />, rootEl)
}
