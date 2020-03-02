// @flow
import { useState } from 'react'
import type { Howl, Sound } from 'types'

export const useSound = (howl: Howl | null, sprite: string): Sound => {
  const [id, setId] = useState<number | null>(null)
  const [isLoop, setIsLoop] = useState<boolean>(false)
  if (!howl) return {}
  console.warn('Howl loaded:', howl)
  const spriteTimes = howl._sprite[sprite]
  if (!spriteTimes) return {}
  const duration = spriteTimes[0]
  const start = spriteTimes[1]
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
