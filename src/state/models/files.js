// @flow
import type { FileState, _FileReducer } from 'types'

const state: FileState = {
  files: [],
  fileIdx: 0,
  file: undefined,
}

const reducers: _FileReducer = {
  load: (state, files) => {
    return {
      ...state,
      files,
      fileIdx: 0,
      file: files[0],
    }
  },
  increment: state => {
    const { fileIdx, files } = state
    if (fileIdx >= files.length - 1) return state
    return {
      ...state,
      fileIdx: fileIdx + 1,
      file: files[fileIdx + 1],
    }
  },
  decrement: state => {
    const { fileIdx, files } = state
    if (fileIdx <= 0) return state
    return {
      ...state,
      fileIdx: fileIdx - 1,
      file: files[fileIdx - 1],
    }
  },
}

export const files = { state, reducers }
