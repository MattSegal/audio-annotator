// @flow
// Public actions that can be performed using dispatch.
// This is the public API that can be called using dispatch.
import type { Clip, Howl } from 'types/objects'

// Actions implemented by the clip model.
type ClipActions = {
  updateFile: (filename: string) => void,
  add: (filename: string, clip: Clip) => void,
  remove: (filename: string, clipIdx: number) => void,
}

// Actions implemented by the file model.
type FileActions = {
  load: (files: Array<File>) => void,
  increment: () => void,
  decrement: () => void,
}

// Actions implemented by the howl model.
type HowlActions = {
  reload: () => void,
  loaded: (howl: Howl) => void,
  setChunkSize: (size: number) => void,
  setChunkIdx: (idx: number) => void,
}

type SoundActions = {
  reload: (howl: Howl, sprite: string) => void,
  current: () => number,
  play: () => void,
  pause: () => void,
  stop: () => void,
  toggleLoop: () => void,
  update: (data: any) => void,
}

// Redux dispatch, as created by rematcher.
export type Dispatch = {
  files: FileActions,
  clips: ClipActions,
  howl: HowlActions,
  sound: SoundActions,
}
