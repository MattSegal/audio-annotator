// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { ClipState, HowlState } from 'types'

export const ClipDisplay = () => {
  const { clips }: ClipState = useSelector(s => s.clips, shallowEqual)
  const { chunkIdx, chunkSize }: HowlState = useSelector(
    s => s.howl,
    shallowEqual
  )
  const startTime = chunkIdx * chunkSize
  const endTime = (chunkIdx + 1) * chunkSize
  const canvasRef = useRef(null)
  // Draw clips
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(250, 200, 0, 0.3)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let clip of clips) {
      if (clip.start < startTime || clip.end > endTime) continue
      const canvasStart = (CANVAS.WIDTH * (clip.start - startTime)) / chunkSize
      const canvasEnd = (CANVAS.WIDTH * (clip.end - startTime)) / chunkSize
      ctx.fillRect(canvasStart, 0, canvasEnd - canvasStart, canvas.height)
    }
  }, [clips, chunkIdx, chunkSize])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const CanvasEl = styled.canvas`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
