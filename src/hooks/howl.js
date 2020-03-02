// @flow
import React, { useState, useEffect } from 'react'
import { Howl as HowlerHowl } from 'howler'

import type { Howl, Clip } from 'types'

export const useHowl = (
  fileIdx: number,
  files: Array<File>,
  chunkSize: number,
  clips: Array<Clip>
) => {
  // HowlerJS Howl.
  const [howl, setHowl] = useState<Howl | null>(null)
  const file = files[fileIdx]

  // Load sound data when file changes.
  useEffect(() => {
    console.warn('Loading howl', file, clips)

    // Remove current sound.
    if (howl) howl.stop()
    setHowl(null)

    // Create a new howl with sprites
    const onDurationKnown = (
      src: null | ArrayBuffer | string,
      duration: number
    ) => {
      // Re-create sound with requested chunk sprites
      const sprites = {}
      let chunkStart = 0
      let idx = 0
      while (chunkStart < duration) {
        const key = `chunk-${idx}`
        const nextStep = chunkStart + chunkSize
        const end = nextStep > duration ? duration : nextStep
        sprites[key] = [chunkStart, end]
        chunkStart = nextStep
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

    // Create a new howl.
    const onLoadFile = () => {
      // Load sound once to get duration.
      let h: Howl
      h = new HowlerHowl({
        src: reader.result,
        format: getAudioFormat(file),
        onload: () => {
          // Convert seconds to centiseconds
          const duration = 100 * h.duration()
          onDurationKnown(reader.result, duration)
        },
      })
    }

    // Read audio file data into memory.
    const reader = new FileReader()
    reader.addEventListener('load', onLoadFile)
    if (file) {
      reader.readAsDataURL(file)
    }
  }, [file, hashClipsArray(clips)])

  return howl
}

// Not really a hash, but a unique string represntation of the clip array for useEffect comparison.
const hashClipsArray = (clips: Array<Clip>): string =>
  clips
    .map(clip => `${clip.start}:${clip.end}`)
    .reduce((clipStr, s) => `${s}-${clipStr}`, '')

// Get audio format name from file object (eg 'mp3', 'wav')
const getAudioFormat = (file: File): string =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()
