// @flow
import type { Howl, SoundState, State, Dispatch } from 'types'

const state: SoundState = {
  id: null,
  sprite: '',
  start: 0,
  end: 0,
  duration: 0,
  isLoop: false,
}

const reducers = {
  reload: (state: SoundState, howl: Howl, sprite: string): SoundState => {
    const spriteTimes = howl._sprite[sprite]
    if (!spriteTimes) return state
    const duration = spriteTimes[0]
    const start = spriteTimes[1]
    const end = start + duration
    return {
      ...state,
      id: null,
      sprite,
      duration,
      start,
      end,
    }
  },
  update: (state: SoundState, data: any): SoundState => ({
    ...state,
    ...data,
  }),
}

const effects = (dispatch: Dispatch) => ({
  play: (state: State) => {
    const { sprite } = state.sound
    const { howl } = state.howl
    if (!howl || !sprite) return
    const id = howl.play(sprite)
    dispatch.sound.update({ id })
  },
  current: (state: State) => {
    const { id } = state.sound
    const { howl } = state.howl
    if (!howl) return
    return id ? howl.seek(id) : 0
  },
  pause: (state: State) => {
    const { id } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.pause(id)
  },
  stop: (state: State) => {
    const { id } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.stop(id)
  },
  toggleLoop: (state: State) => {
    const { id, isLoop } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.loop(!isLoop)
    dispatch.sound.update({ isLoop: !isLoop })
  },
})

export const sound = { state, reducers, effects }
