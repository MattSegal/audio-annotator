// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

type Props = {
  clips: Array<[number, number]>,
  dragStart: number,
  dragEnd: number,
  setClips: (Array<[number, number]>) => void,
  setDragStart: number => void,
  setDragEnd: number => void,
}

export const ClipControls = ({
  clips,
  dragStart,
  dragEnd,
  setClips,
  setDragEnd,
  setDragStart,
}: Props) => {
  const elementRef = useRef(null)
  const clipsRef = useRef(clips)
  const newClipRef = useRef([dragStart, dragEnd])
  newClipRef.current = [dragStart, dragEnd]
  clipsRef.current = clips

  const onSave = () => {
    let newClip = getNewClip(newClipRef.current, clipsRef.current)
    if (newClip) {
      const newClips = [...clipsRef.current, newClip].sort(sortClips)
      setClips(newClips)
    }
  }

  // Handle mouse events.
  useEffect(() => {
    if (!elementRef.current) return
    const el = elementRef.current
    const onMouseDown = (e: MouseEvent) => {
      const startX = e.offsetX
      setDragStart(startX)
    }
    const onMouseMove = (e: MouseEvent) => {
      const endX = e.offsetX
      setDragEnd(endX)
    }
    const onMouseUp = () => {
      onSave()
      setDragStart(0)
      setDragEnd(0)
    }
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseup', onMouseUp)
    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseup', onMouseUp)
    }
  }, [])
  return <El ref={elementRef} />
}

const El = styled.div`
  width: ${CANVAS.WIDTH}px;
  height: ${CANVAS.HEIGHT}px;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`

const sortClips = (a, b) => a[0] - b[0]

export const getNewClip = (
  points: [number, number],
  clips: Array<[number, number]>
): [number, number] | void => {
  // Ensure points are sorted
  const clip = points[0] < points[1] ? points : [points[1], points[0]]
  // If it's the only clip, just add it.
  if (clips.length < 1) return clip
  // If it's not the only clip, slot in in somewhere if possible.
  const [start, end] = clip
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
