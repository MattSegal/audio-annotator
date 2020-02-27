// @flow
import React, { useState, useEffect } from 'react'
import { Howl as HowlerHowl } from 'howler'

import type { Howl, EventClip } from 'types'

export const useHowl = (
  fileIdx: number,
  files: Array<File>,
  chunkSize: number,
  clips: Array<EventClip>
) => {
  // HowlerJS Howl.
  const [howl, setHowl] = useState<Howl | null>(null)

  // Load sound data when file changes.
  useEffect(() => {
    const file = files[fileIdx]

    // Remove current sound.
    if (howl) howl.stop()
    setHowl(null)

    // Create a new howl.
    const onLoadFile = () => {
      // Load sound once to get duration.
      const h: Howl = new HowlerHowl({
        src: reader.result,
        format: getAudioFormat(file),
      })
      const duration = h.duration()

      // Re-create sound with requested chunk sprites
      const sprites = {}
      let chunkStart = 0
      let idx = 0
      while (chunkStart + chunkSize < duration) {
        const key = `chunk-${idx}`
        sprites[key] = [chunkStart, chunkSize]
        chunkStart += chunkSize
        idx++
      }

      // Add clip sprites
      for (let i = 0; i < clips.length; i++) {
        const { start, end } = clips[i]
        const key = `clip-${idx}`
        sprites[key] = [start, end - start]
      }

      const newHowl: Howl = new HowlerHowl({
        src: reader.result,
        format: getAudioFormat(file),
        sprites,
      })
      setHowl(newHowl)
    }

    // Read audio file data into memory.
    const reader = new FileReader()
    reader.addEventListener('load', onLoadFile)
    reader.readAsDataURL(file)
  }, [fileIdx, clips])

  return howl
}

// Get audio format name from file object (eg 'mp3', 'wav')
const getAudioFormat = (file: File): string =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()
