// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { Dispatch, Clip, ClipState, FileState, HowlState } from 'types'

export const ClipControls = () => {
  const dispatch: Dispatch = useDispatch()
  const { file }: FileState = useSelector(s => s.files, shallowEqual)
  const { drag }: ClipState = useSelector(s => s.clips, shallowEqual)
  const { chunkIdx, chunkSize }: HowlState = useSelector(
    s => s.howl,
    shallowEqual
  )
  const startTime = chunkIdx * chunkSize
  const elementRef = useRef(null)
  const newClipRef = useRef<Clip>(drag)
  newClipRef.current = {
    start: startTime + chunkSize * (drag.start / CANVAS.WIDTH),
    end: startTime + chunkSize * (drag.end / CANVAS.WIDTH),
  }

  // Handle mouse events.
  useEffect(() => {
    if (!elementRef.current) return
    const el = elementRef.current
    const onMouseDown = (e: MouseEvent) => {
      const startX = e.offsetX
      const startTime = startX
      dispatch.clips.setDragStart(startTime)
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!newClipRef.current.start) return
      const endX = e.offsetX
      const endTime = endX
      dispatch.clips.setDragEnd(endTime)
    }
    const onMouseUp = () => {
      const filename = file ? file.name : ''
      dispatch.clips.add({ filename: filename, clip: newClipRef.current })
      dispatch.clips.setDragStart(0)
      dispatch.clips.setDragEnd(0)
    }
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseup', onMouseUp)
    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseup', onMouseUp)
    }
  }, [file])
  return <ClipControlsEl ref={elementRef} />
}

const ClipControlsEl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
