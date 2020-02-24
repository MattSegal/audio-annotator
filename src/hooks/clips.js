// @flow
import React, { useState, useEffect } from 'react'
import type { EventClip, EventClipState } from 'types'

const EVENT_CLIPS_KEY = 'event-clip-state'

export const useClips = (files: Array<File>, fileIdx: number) => {
  const [clips, setClips] = useState<EventClipState>({})
  const file = files[fileIdx]
  const fileClips = clips[file.name] || []

  // Load clips from local storage cache.
  useEffect(() => setClips(loadClips()), [])

  // Save clips to the local storage cache.
  useEffect(() => saveClips(clips), [clips])

  const deleteClip = (clipIdx: number) =>
    setClips({
      ...clips,
      [file.name]: fileClips.filter((val, idx) => idx !== clipIdx),
    })

  const addClip = (a: number, b: number) => {
    let newClip = getNewClip([a, b], fileClips)
    if (newClip) {
      const newClips = [...fileClips, newClip].sort(sortClips)
      setClips({
        ...clips,
        [file.name]: newClips,
      })
    }
  }

  return {
    clips,
    fileClips,
    addClip,
    deleteClip,
  }
}

const sortClips = (a, b) => a.start - b.start

// Save event clips to local storage.
const saveClips = (clips: EventClipState) => {
  const clipsStr = JSON.stringify(clips)
  localStorage.setItem(EVENT_CLIPS_KEY, clipsStr)
}

// Load cached event clips from local storage
const loadClips = (): EventClipState => {
  const clipsStr = localStorage.getItem(EVENT_CLIPS_KEY)
  return clipsStr ? JSON.parse(clipsStr) : {}
}

export const getNewClip = (
  points: [number, number],
  clips: Array<EventClip>
): EventClip | void => {
  // Ensure points are sorted
  const [start, end] = points[0] < points[1] ? points : [points[1], points[0]]
  const clip = { start, end }
  // If it's the only clip, just add it.
  if (clips.length < 1) return clip
  // If it's not the only clip, slot in in somewhere if possible.
  if (end < clips[0][0]) return clip
  for (let i = 0; i < clips.length; i++) {
    const prevClip = clips[i]
    const nextClip = i < clips.length - 1 ? clips[i + 1] : null
    const isAfterPrev = start > prevClip[1]
    const isBeforeNext = nextClip ? end < nextClip[0] : true
    if (isAfterPrev && isBeforeNext) {
      return clip
    }
  }
}
