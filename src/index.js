// @flow
import 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root'

import { App } from './app'

const HotApp = hot(App)
const rootEl = document.getElementById('root')
if (rootEl) {
  render(<HotApp />, rootEl)
}
