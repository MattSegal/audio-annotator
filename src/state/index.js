// @flow
import { init } from '@rematch/core'
import logger from 'redux-logger'

import * as models from './models'

export const store = init({
  models,
  redux: {
    middlewares: [logger],
  },
})
