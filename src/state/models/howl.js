// @flow
import { Howl as HowlerHowl } from 'howler'
import type { Howl, HowlState, State, Dispatch } from 'types'

const state: HowlState = {
  howl: null,
  loading: true,
  chunkSize: 400,
  chunkIdx: 0,
}
const reducers = {
  // Reload the current sounds
  reload: (state: HowlState): HowlState => ({
    ...state,
    loading: true,
  }),
  loaded: (state: HowlState, howl: Howl): HowlState => ({
    ...state,
    loading: false,
    howl,
  }),
  setChunkSize: (state: HowlState, size: number): HowlState => ({
    ...state,
    chunkSize: size,
  }),
  setChunkIdx: (state: HowlState, idx: number): HowlState => ({
    ...state,
    chunkIdx: idx,
  }),
}

const effects = (dispatch: Dispatch) => ({
  loaded: (payload: void, state: State) => {
    const { howl, chunkIdx } = state.howl
    const sprite = `chunk-${chunkIdx}`
    if (!howl) return
    dispatch.sound.reload(howl, sprite)
  },
  reload: (payload: void, state: State) => reload(dispatch, state),
  setChunkSize: (payload: void, state: State) => reload(dispatch, state),
  setChunkIdx: (payload: void, state: State) => reload(dispatch, state),
})

// Reload the Howl
const reload = (dispatch, state) => {
  const { howl, chunkSize } = state.howl
  const { file } = state.files
  if (!file) return
  const clips = state.clips[file.name]
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
        const duration = 100 * h.duration()
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
    while (chunkStart < duration) {
      const key = `chunk-${idx}`
      const nextStep = chunkStart + chunkSize
      const end = nextStep > duration ? duration : nextStep
      sprites[key] = [chunkStart, end]
      chunkStart = nextStep
      idx++
    }

    // Add clip sprites
    for (let i = 0; i < clips.length; i++) {
      const { start, end } = clips[i]
      const key = `clip-${idx}`
      sprites[key] = [start, end - start]
    }

    const newHowl: Howl = new HowlerHowl({
      src: reader.result,
      format: getAudioFormat(file),
      sprites,
    })
    dispatch.howl.loaded(newHowl)
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
