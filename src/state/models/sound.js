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
  reload: (
    state: SoundState,
    payload: { howl: Howl, sprite: string }
  ): SoundState => {
    const { howl, sprite } = payload
    const spriteTimes = howl._sprite[sprite]
    if (!spriteTimes) return state
    const start = spriteTimes[0]
    const duration = spriteTimes[1]
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
  play: (_: void, state: State) => {
    const { id, sprite } = state.sound
    const { howl } = state.howl
    if (!howl || !sprite) return
    if (id) {
      howl.play(id)
    } else {
      const id = howl.play(sprite)
      dispatch.sound.update({ id })
    }
  },
  pause: (_: void, state: State) => {
    const { id } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.pause(id)
  },
  stop: (_: void, state: State) => {
    const { id } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.stop(id)
  },
  toggleLoop: (_: void, state: State) => {
    const { id, isLoop } = state.sound
    const { howl } = state.howl
    if (!howl || !id) return
    howl.loop(!isLoop)
    dispatch.sound.update({ isLoop: !isLoop })
  },
})

export const sound = { state, reducers, effects }
