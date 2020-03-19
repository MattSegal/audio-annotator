// @flow
import type { State, FileState, Dispatch } from 'types'

const state: FileState = {
  files: [],
  fileIdx: 0,
  file: undefined,
}

const reducers = {
  load: (state: FileState, files: Array<File>): FileState => {
    return {
      ...state,
      files,
      fileIdx: 0,
      file: files[0],
    }
  },
  increment: (state: FileState): FileState => {
    const { fileIdx, files } = state
    if (fileIdx >= files.length - 1) return state
    return {
      ...state,
      fileIdx: fileIdx + 1,
      file: files[fileIdx + 1],
    }
  },
  decrement: (state: FileState): FileState => {
    const { fileIdx, files } = state
    if (fileIdx <= 0) return state
    return {
      ...state,
      fileIdx: fileIdx - 1,
      file: files[fileIdx - 1],
    }
  },
}

const effects = (dispatch: Dispatch) => ({
  // Tell the Howl model to load the new file when the file changes.
  load: (state: State) => onFileChange(state, dispatch),
  increment: (state: State) => onFileChange(state, dispatch),
  decrement: (state: State) => onFileChange(state, dispatch),
})

const onFileChange = (state: State, dispatch: Dispatch) => {
  const { file } = state.files
  if (!file) return
  dispatch.clips.updateFile(file.name)
  dispatch.howl.reload()
}

export const files = { state, reducers, effects }
