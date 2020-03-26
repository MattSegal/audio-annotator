// @flow
import { getNewClip } from '../utils'

import type { ClipState, Clip, Dispatch, State } from 'types'

const EVENT_CLIPS_KEY = 'event-clip-state'

// Save event clips to local storage.
const saveFileClips = (clips: { [string]: Array<Clip> }) => {
  const clipsStr = JSON.stringify(clips)
  localStorage.setItem(EVENT_CLIPS_KEY, clipsStr)
}

// Load cached event clips from local storage
const loadFileClips = (): { [string]: Array<Clip> } => {
  const clipsStr = localStorage.getItem(EVENT_CLIPS_KEY)
  try {
    return clipsStr ? JSON.parse(clipsStr) : {}
  } catch {
    saveFileClips({})
    return {}
  }
}

const state: ClipState = {
  fileClips: loadFileClips(),
  clips: [],
  drag: {
    start: 0,
    end: 0,
  },
}

const reducers = {
  setDragStart: (state: ClipState, start: number): ClipState => ({
    ...state,
    drag: {
      ...state.drag,
      start,
    },
  }),
  setDragEnd: (state: ClipState, end: number): ClipState => ({
    ...state,
    drag: {
      ...state.drag,
      end,
    },
  }),
  updateFile: (state: ClipState, filename: string): ClipState => ({
    ...state,
    clips: state.fileClips[filename] || [],
  }),
  // Add a new clip.
  add: (
    state: ClipState,
    payload: { filename: string, clip: Clip }
  ): ClipState => {
    const { filename, clip } = payload
    const newClip = getNewClip([clip.start, clip.end], state.clips)
    if (!newClip) return state
    const newClips = [...state.clips, newClip].sort(sortClips)
    const newFileClips = { ...state.fileClips, [filename]: newClips }
    return {
      ...state,
      fileClips: newFileClips,
      clips: newClips,
    }
  },
  // Remove an existing clip
  remove: (
    state: ClipState,
    payload: { filename: string, clipIdx: number }
  ): ClipState => {
    const { filename, clipIdx } = payload
    const { clips, fileClips } = state
    const newClips = clips.filter((val, idx) => idx !== clipIdx)
    const newFileClips = { ...fileClips, [filename]: newClips }
    return {
      ...state,
      fileClips: newFileClips,
      clips: newClips,
    }
  },
}

const effects = (dispatch: Dispatch) => ({
  // Tell the Howl model to reload the the clips change.
  add: (_: void, state: State) => onClipChange(state, dispatch),
  remove: (_: void, state: State) => onClipChange(state, dispatch),
})

const onClipChange = (state: State, dispatch: Dispatch) => {
  saveFileClips(state.clips.fileClips)
  dispatch.howl.reload()
}

export const clips = { state, reducers, effects }

const sortClips = (a: any, b: any) => a.start - b.start
