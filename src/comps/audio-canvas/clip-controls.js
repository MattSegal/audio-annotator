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
    const _clips = clipsRef.current
    const [start, end] = newClipRef.current
    const newClip = [start, end]
    if (!(start && end)) return
    if (_clips.length < 1) {
      setClips([newClip])
    } else if (end < _clips[0][0]) {
      setClips([newClip, ..._clips])
    } else if (start > _clips[_clips.length - 1][1]) {
      setClips([..._clips, newClip])
    } else {
      for (let i = 1; i < _clips.length; i++) {
        const prevClip = _clips[i - 1]
        const nextClip = _clips[i + 1]
        // const isBetweenClips = start > prevClip[0] && end < nextClip[1]
        const isNoOverlap = start > prevClip[1] && end < nextClip[0]
        // Skip this clip if it starts before the previous one, or ends after the next.
        if (isNoOverlap) {
          const newClips = [..._clips.slice(0, i), newClip, ..._clips.slice(i)]
          setClips(newClips)
        }
      }
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
