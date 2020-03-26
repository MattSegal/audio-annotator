// @flow
// This file contains the public state used by rematcher,
// and the private reducers + effects.
import type { Clip, Howl } from 'types/objects'

// Rematcher states
export type ClipState = {
  fileClips: { [string]: Array<Clip> },
  clips: Array<Clip>,
  drag: {
    start: number,
    end: number,
  },
}

export type FileState = {
  files: Array<File>,
  fileIdx: number,
  file: File | void,
}

export type HowlState = {
  howl: Howl | null,
  chunkIdx: number,
  chunkSize: number,
  numChunks: number,
}

export type SoundState = {
  id: number | null,
  start: number, // N.B all time in 1000ths of a second
  end: number,
  duration: number,
  isLoop: boolean,
  playbackRate: number,
  sprite: string,
}

// Complete applications state.
export type State = {
  sound: SoundState,
  files: FileState,
  clips: ClipState,
  howl: HowlState,
}
