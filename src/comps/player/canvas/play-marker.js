// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

type Props = {
  time: number,
  maxTime: number,
}
const RENDER_MS = 32 // ~ 30 FPS

// Renders the current play time marker to a canvas
export const PlayMarker = ({ time, maxTime }: Props) => {
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)
  useEffect(() => {
    if (intervalRef.current) {
      // Clean up any existing animations
      clearInterval(intervalRef.current)
    }
    // Start a new animation
    intervalRef.current = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      renderPlayMarker(canvas, time, maxTime)
    }, RENDER_MS)
    return () => {
      // Clean up animation rendering on dismount.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [time, maxTime])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const renderPlayMarker = (canvas, time: number, maxTime: number) => {
  const percentDone = time / maxTime
  const xPos = canvas.width * percentDone
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = '#f00'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(xPos, 0)
  ctx.lineTo(xPos, canvas.height)
  ctx.stroke()
}

const CanvasEl = styled.canvas`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
