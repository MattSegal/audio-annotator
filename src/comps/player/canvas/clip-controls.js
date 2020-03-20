// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, shallowEquals } from 'react-redux'

import { CANVAS } from 'consts'

import type { Dispatch, Clip, ClipState, FileState } from 'types'

export const ClipControls = () => {
  const dispatch: Dispatch = useDispatch()
  const { file }: FileState = useSelector(s => s.files, shallowEquals)
  const { clips, drag }: ClipState = useSelector(s => s.clips, shallowEquals)

  const elementRef = useRef(null)
  const clipsRef = useRef(clips)
  const newClipRef = useRef<Clip>(drag)
  newClipRef.current = drag
  clipsRef.current = clips

  // Handle mouse events.
  useEffect(() => {
    if (!elementRef.current) return
    const el = elementRef.current
    const onMouseDown = (e: MouseEvent) => {
      const startX = e.offsetX
      dispatch.clips.setDragStart(startX)
    }
    const onMouseMove = (e: MouseEvent) => {
      const endX = e.offsetX
      dispatch.clips.setDragEnd(endX)
    }
    const onMouseUp = () => {
      const filename = file ? file.name : ''
      dispatch.clips.add(filename, newClipRef.current)
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
  }, [])
  return <ClipControlsEl ref={elementRef} />
}

const ClipControlsEl = styled.div`
  width: ${CANVAS.WIDTH}px;
  height: ${CANVAS.HEIGHT}px;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
