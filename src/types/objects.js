// @flow
// Common objects and data structures used in the app.

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
  play: (spriteOrSoundId?: string | number, soundId?: number) => number,
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
