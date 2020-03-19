// @flow
import { getNewClip } from '../utils'

import type { ClipState, Clip, Dispatch } from 'types'

const state: ClipState = {
  fileClips: {},
  clips: [],
  drag: {
    start: 0,
    end: 0,
  },
}

const reducers = {
  updateFile: (state: ClipState, filename: string): ClipState => ({
    ...state,
    clips: state.fileClips[filename] || [],
  }),
  // Add a new clip.
  add: (state: ClipState, filename: string, clip: Clip): ClipState => {
    const fileClips = state[filename]
    const newClip = getNewClip([clip.start, clip.end], fileClips)
    // TODO - UPDATE ADD AND REMOVE TO REFLECT NEW CLIPS STATE
    return {
      ...state,
      [filename]: [...fileClips, newClip].sort(sortClips),
    }
  },
  // Remove an existing clip
  remove: (state: ClipState, filename: string, clipIdx: number): ClipState => {
    const fileClips = state[filename]
    return {
      ...state,
      [filename]: fileClips.filter((val, idx) => idx !== clipIdx),
    }
  },
}

const effects = (dispatch: Dispatch) => ({
  // Tell the Howl model to reload the the clips change.
  add: () => dispatch.howl.reload(),
  remove: () => dispatch.howl.reload(),
})

export const clips = { state, reducers, effects }

const sortClips = (a: any, b: any) => a.start - b.start

// TODO - add this back
// I think this is a plugin or some middleware or something?
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
