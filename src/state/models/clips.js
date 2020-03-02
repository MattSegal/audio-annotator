// @flow
import { getNewClip } from '../utils'

import type { ClipState, _ClipReducer } from 'types'

const state: ClipState = {}
const reducers: _ClipReducer = {
  // Add a new clip.
  add: (state, filename, clip) => {
    const fileClips = state[filename]
    const newClip = getNewClip([clip.start, clip.end], fileClips)
    return {
      ...state,
      [filename]: [...fileClips, newClip].sort(sortClips),
    }
  },
  // Remove an existing clip
  remove: (state, filename, clipIdx) => {
    const fileClips = state[filename]
    return {
      ...state,
      [filename]: fileClips.filter((val, idx) => idx !== clipIdx),
    }
  },
}

export const clips = { state, reducers }

const sortClips = (a: any, b: any) => a.start - b.start

// TODO - add this back
// // Save event clips to local storage.
// const saveClips = (clips: ClipState) => {
//   const clipsStr = JSON.stringify(clips)
//   localStorage.setItem(EVENT_CLIPS_KEY, clipsStr)
// }

// // Load cached event clips from local storage
// const loadClips = (): ClipState => {
//   const clipsStr = localStorage.getItem(EVENT_CLIPS_KEY)
//   return clipsStr ? JSON.parse(clipsStr) : {}
// }
// const EVENT_CLIPS_KEY = 'event-clip-state'
