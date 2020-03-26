// @flow
import type { Clip } from 'types'

export const getNewClip = (
  points: [number, number],
  clips: Array<Clip>
): Clip | void => {
  // Ensure points are sorted
  const [start, end] = points[0] < points[1] ? points : [points[1], points[0]]
  const clip = { start, end }
  // If it's the only clip, just add it.
  if (clips.length < 1) return clip
  // If it's not the only clip, slot in in somewhere if possible.
  if (end < clips[0].start) return clip
  for (let i = 0; i < clips.length; i++) {
    const prevClip = clips[i]
    const nextClip = i < clips.length - 1 ? clips[i + 1] : null
    const isAfterPrev = start > prevClip.end
    const isBeforeNext = nextClip ? end < nextClip.start : true
    if (isAfterPrev && isBeforeNext) {
      return clip
    }
  }
}
