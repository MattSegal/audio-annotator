// @flow
import { Howl as HowlerHowl } from 'howler'
import type { Howl, HowlState, State, Dispatch } from 'types'

const state: HowlState = {
  howl: null,
  loading: true,
  chunkSize: 3000,
  chunkIdx: 0,
  numChunks: 0,
}
const reducers = {
  loaded: (
    state: HowlState,
    payload: { howl: Howl, numChunks: number }
  ): HowlState => {
    const { howl, numChunks } = payload
    return {
      ...state,
      chunkIdx: numChunks === state.numChunks ? state.chunkIdx : 0,
      howl,
      numChunks,
    }
  },
  incrementChunkSize: (state: HowlState): HowlState => {
    const { chunkSize } = state
    if (chunkSize >= 5000) return state
    return {
      ...state,
      chunkSize: chunkSize + 500,
    }
  },
  decrementChunkSize: (state: HowlState): HowlState => {
    const { chunkSize } = state
    if (chunkSize <= 500) return state
    return {
      ...state,
      chunkSize: chunkSize - 500,
    }
  },

  incrementChunkIdx: (state: HowlState): HowlState => {
    const { chunkIdx, numChunks } = state
    if (chunkIdx >= numChunks - 1) return state
    return {
      ...state,
      chunkIdx: chunkIdx + 1,
    }
  },
  decrementChunkIdx: (state: HowlState): HowlState => {
    const { chunkIdx } = state
    if (chunkIdx <= 0) return state
    return {
      ...state,
      chunkIdx: chunkIdx - 1,
    }
  },
}

const effects = (dispatch: Dispatch) => ({
  loaded: (payload: { howl: Howl, numChunks: number }, state: State) => {
    const { chunkIdx } = state.howl
    const sprite = `chunk-${chunkIdx}`
    if (!payload.howl) return
    dispatch.sound.reload({ howl: payload.howl, sprite })
  },
  reload: (_: void, state: State) => reload(dispatch, state),
  incrementChunkSize: (_: void, state: State) => reload(dispatch, state),
  decrementChunkSize: (_: void, state: State) => reload(dispatch, state),
  incrementChunkIdx: (_: void, state: State) => reload(dispatch, state),
  decrementChunkIdx: (_: void, state: State) => reload(dispatch, state),
})

// Reload the Howl
const reload = (dispatch, state) => {
  const { howl, chunkSize } = state.howl
  const { file } = state.files
  if (!file) return
  const clips = state.clips.fileClips[file.name] || []
  if (howl) howl.stop()

  // Create a new howl.
  const onLoadFile = () => {
    // Load sound once to get duration.
    let h: Howl
    h = new HowlerHowl({
      src: reader.result,
      format: getAudioFormat(file),
      onload: () => {
        // Convert seconds to centiseconds
        const duration = 1000 * h.duration()
        onDurationKnown(reader.result, duration)
      },
    })
  }

  // Create a new howl with sprites
  const onDurationKnown = (
    src: null | ArrayBuffer | string,
    duration: number
  ) => {
    // Re-create sound with requested chunk sprites
    const sprites = {}
    let chunkStart = 0
    let idx = 0
    let numChunks = 0
    while (chunkStart < duration) {
      const key = `chunk-${idx}`
      const nextStep = chunkStart + chunkSize
      const end = nextStep > duration ? duration : nextStep
      // [offset, duration]
      sprites[key] = [chunkStart, end - chunkStart]
      chunkStart = nextStep
      numChunks++
      idx++
    }

    // Add clip sprites
    for (let i = 0; i < clips.length; i++) {
      const { start, end } = clips[i]
      const key = `clip-${idx}`
      // [offset, duration]
      sprites[key] = [start, end - start]
    }

    const newHowl: Howl = new HowlerHowl({
      src: reader.result,
      format: getAudioFormat(file),
      sprite: sprites,
    })
    dispatch.howl.loaded({ howl: newHowl, numChunks })
  }

  // Read audio file data into memory.
  const reader = new FileReader()
  reader.addEventListener('load', onLoadFile)
  reader.readAsDataURL(file)
}

// Get audio format name from file object (eg 'mp3', 'wav')
const getAudioFormat = (file: File): string =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()

export const howl = { state, reducers, effects }
