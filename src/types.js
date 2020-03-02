// @flow

// A time period in the audio file (start, stop),
// representing an event tagged by the user.
export type Clip = {
  start: number,
  end: number,
}

// HowlerJS Sound object.
// https://github.com/goldfire/howler.js/
export type Howl = {
  // Play sound / soundId / sprite, returns a soundId
  play: (sprite?: string, soundId?: number) => number,
  // Stop sound
  stop: (soundId?: number) => void,
  // Returns whether sound is playing
  playing: (soundId?: number) => boolean,
  // Pause sound
  pause: (soundId?: number) => void,
  // Get/set for current sound time
  seek: (seek?: number, soundId?: number) => number,
  // Get/set looping
  loop: (loop?: boolean, soundId?: number) => boolean,
  // Get/set rate of playback (0.5 -> 4)
  rate: (rate?: number, soundId?: number) => number,
  // Get duration of sound
  duration: (soundId?: number) => number,
  ctx: AudioContext,
  _sprite: {
    [string]: [number, number],
  },
}

// Generic slice of audio which can be played by the user.
export type Sound = {
  id: number | null,
  start: number, // N.B all time in 100ths of a second
  end: number,
  duration: number,
  isLoop: boolean,
  current: () => number,
  play: () => void,
  pause: () => void,
  stop: () => void,
  toggleLoop: () => void,
}

// Mapping from filename to event clip array.
export type ClipState = {
  [string]: Array<Clip>,
}

export type _ClipReducer = {
  add: (state: ClipState, filename: string, clip: Clip) => ClipState,
  remove: (state: ClipState, filename: string, clipIdx: number) => ClipState,
}
export type ClipReducer = {
  add: (filename: string, clip: Clip) => void,
  remove: (filename: string, clipIdx: number) => void,
}
export type FileState = {
  files: Array<File>,
  fileIdx: number,
  file: File | void,
}

export type _FileReducer = {
  load: (state: FileState, files: Array<File>) => FileState,
  increment: (state: FileState) => FileState,
  decrement: (state: FileState) => FileState,
}
export type FileReducer = {
  load: (files: Array<File>) => void,
  increment: () => void,
  decrement: () => void,
}

export type HowlState = {}
export type _HowlReducer = {}
export type HowlReducer = {}

// Redux state
export type State = {
  files: FileState,
  clips: ClipState,
  howl: HowlState,
}

// Redux dispatch, as created by rematcher.
export type Dispatch = {
  files: FileReducer,
  clips: ClipReducer,
  howl: HowlReducer,
}
