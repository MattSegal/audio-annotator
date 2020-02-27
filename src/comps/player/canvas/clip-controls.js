// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

import type { EventClip } from 'types'

type Props = {
  clips: Array<EventClip>,
  dragStart: number,
  dragEnd: number,
  addClip: EventClip => void,
  setDragStart: number => void,
  setDragEnd: number => void,
}

export const ClipControls = ({
  clips,
  dragStart,
  dragEnd,
  addClip,
  setDragEnd,
  setDragStart,
}: Props) => {
  const elementRef = useRef(null)
  const clipsRef = useRef(clips)
  const newClipRef = useRef<EventClip>({
    start: dragStart,
    end: dragEnd,
  })
  newClipRef.current = { start: dragStart, end: dragEnd }
  clipsRef.current = clips

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
      addClip(newClipRef.current)
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
  return <ClipControlsEl ref={elementRef} />
}

const ClipControlsEl = styled.div`
  width: ${CANVAS.WIDTH}px;
  height: ${CANVAS.HEIGHT}px;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
