// @flow
// Public actions that can be performed using dispatch.
// This is the public API that can be called using dispatch.
import type { Clip, Howl } from 'types/objects'

type ClipActions = {
  updateFile: (filename: string) => void,
  add: (payload: { filename: string, clip: Clip }) => void,
  remove: (payload: { filename: string, clipIdx: number }) => void,
  setDragStart: (start: number) => void,
  setDragEnd: (end: number) => void,
  incrementStart: (payload: { filename: string, clip: Clip }) => void,
  decrementStart: (payload: { filename: string, clip: Clip }) => void,
  incrementEnd: (payload: { filename: string, clip: Clip }) => void,
  decrementEnd: (payload: { filename: string, clip: Clip }) => void,
}

type FileActions = {
  load: (files: Array<File>) => void,
  increment: () => void,
  decrement: () => void,
}

type HowlActions = {
  reload: () => void,
  loaded: (payload: { howl: Howl, numChunks: number }) => void,
  incrementChunkSize: () => void,
  decrementChunkSize: () => void,
  incrementChunkIdx: () => void,
  decrementChunkIdx: () => void,
}

type SoundActions = {
  reload: (payload: { howl: Howl, sprite: string }) => void,
  play: () => void,
  pause: () => void,
  stop: () => void,
  toggleLoop: () => void,
  incrementRate: () => void,
  decrementRate: () => void,
  update: (payload: any) => void,
}

// Redux dispatch, as created by rematcher.
export type Dispatch = {
  files: FileActions,
  clips: ClipActions,
  howl: HowlActions,
  sound: SoundActions,
}
