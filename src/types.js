// @flow

// A time period in the audio file (start, stop),
// representing an event tagged by the user.
export type EventClip = {
  start: number,
  end: number,
}

// Mapping from filename to event clip array.
export type EventClipState = {
  [string]: Array<EventClip>,
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
  sprites: {
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
