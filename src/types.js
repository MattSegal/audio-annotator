// @flow
// A time period in the audio file (start, stop),
// representing an event tagged by the user.
export type EventClip = {
  start: number,
  end: number,
}

// A segment of a audio file, which the user may tag
export type AudioChunk = {
  start: number, // N.B all time in 100ths of a second
  end: number,
  current: number,
  play: () => void,
  pause: () => void,
  stop: () => void,
  toggleLoop: () => void,
}

// An audio file uploaded by the user for tagging.
export type AudioFile = {
  name: string,
  format: string,
  clips: Array<EventClip>,
  chunks: Array<AudioChunk>,
  file: File,
  addClip: (number, number) => void,
  deleteClip: number => void,
}

// Mapping from filename to event clip array.
export type EventClipState = {
  [string]: Array<EventClip>,
}

// HowlerJS Sound object.
// https://github.com/goldfire/howler.js/
export type HowlerSound = {
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
}
