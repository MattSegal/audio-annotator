// @flow
import React, { useState, useEffect } from 'react'
import { Howl } from 'howler'

import type { HowlerSound } from 'types'

export const useSound = (
  fileIdx: number,
  files: Array<File>,
  chunkSize: number,
  chunkIdx: number
) => {
  const [sound, setSound] = useState<HowlerSound | null>(null)
  const [isLoop, setLoop] = useState<boolean>(false)

  // Load sound data when file changes.
  useEffect(() => {
    const file = files[fileIdx]
    // Remove current sound.
    if (sound) sound.stop()
    setSound(null)
    // Create a new sound.
    const onLoadFile = () => {
      // Load sound once to get duration.
      const s: HowlerSound = new Howl({
        src: reader.result,
        format: getAudioFormat(file),
      })
      const duration = s.duration()
      // Re-create sound with requested sprites
      const sprites = {}
      let chunkStart = 0
      let idx = 0
      while (chunkStart + chunkSize < duration) {
        sprites[idx] = [chunkStart, chunkStart + duration]
        chunkStart += duration
        idx++
      }
      const newSound: HowlerSound = new Howl({
        src: reader.result,
        format: getAudioFormat(file),
        sprites,
      })
      setSound(newSound)
    }
    // Read audio file data into memory.
    const reader = new FileReader()
    reader.addEventListener('load', onLoadFile)
    reader.readAsDataURL(file)
  }, [fileIdx])

  // Handle loop toggle
  useEffect(() => {
    if (sound) {
      sound.loop(isLoop)
    }
  }, [isLoop])

  // TODO - setLoop false on file change.

  const onLoop = () => setLoop(l => !l)

  const onPlay = () => sound && !sound.playing() && sound.play()
  const onPause = () => sound && sound.pause()
  const onStop = () => sound && sound.stop()

  const currentTime = sound.seek()
  const maxTime = sound._duration
}

// Get audio format name from file object (eg 'mp3', 'wav')
const getAudioFormat = (file: File): string =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()
