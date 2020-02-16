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
      const newClips = [...clips, newClip].sort(sortClips)
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

// getNewClip(newClipRef.current, clipsRef.current
const getNewClip = (
  pointA: number,
  pointB: number,
  clips: Array<[number, number]>
) => {
  if (_clips.length < 1) {
    // If it's the only clip, just add it.
    addClip = true
  } else {
    // If it's not the only clip, slot in in somewhere if possible.
    for (let i = 0; i < _clips.length; i++) {
      const prevClip = i > 0 ? _clips[i] : null
      const nextClip = i < clips.length - 1 ? _clips[i + 1] : null
      const isAfterPrev = prevClip ? start > prevClip[1] : true
      const isBeforeNext = nextClip ? end < nextClip[0] : true
      if (isAfterPrev && isBeforeNext) {
        console.log(
          'prev',
          prevClip,
          'next',
          nextClip,
          'is after',
          isAfterPrev,
          'is before',
          isBeforeNext
        )
        addClip = true
      }
    }
  }

  return true
}
