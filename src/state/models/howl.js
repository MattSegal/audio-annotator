// @flow
import type { HowlState, _HowlReducer } from 'types'

const state: HowlState = {
  howl: null,
}
const reducers: _HowlReducer = {
  // Respond to chunk size changes.

  // Respond to file changes.
  'files/load': () => null,
  'files/increment': () => null,
  'files/decrement': () => null,
}

export const howl = { state, reducers }
