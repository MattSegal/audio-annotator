// @flow
import { useState } from 'react'
import type { Howl, Sound } from 'types'

export const useSound = (howl: Howl, sprite: string): Sound => {
  const [id, setId] = useState<number | null>(null)
  const [isLoop, setIsLoop] = useState<boolean>(false)
  const [start, duration] = howl.sprites[sprite]
  const end = start + duration
  const play = () => {
    const _id = howl.play(sprite)
    setId(_id)
  }
  const current = () => {
    if (id) {
      return howl.seek(id)
    } else {
      return 0
    }
  }
  const pause = () => {
    if (id) howl.pause(id)
  }
  const stop = () => {
    if (id) howl.stop(id)
  }
  const toggleLoop = () => {
    if (id) {
      howl.loop(!isLoop)
      setIsLoop(!isLoop)
    }
  }
  return {
    id,
    start,
    end,
    duration,
    current,
    isLoop,
    play,
    pause,
    stop,
    toggleLoop,
  }
}
