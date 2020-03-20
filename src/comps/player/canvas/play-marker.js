// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, shallowEquals } from 'react-redux'

import { CANVAS } from 'consts'

import type { SoundState, Dispatch } from 'types'

const RENDER_MS = 32 // ~ 30 FPS

// Renders the current play time marker to a canvas
export const PlayMarker = () => {
  const dispatch: Dispatch = useDispatch()
  const { start, duration }: SoundState = useSelector(
    s => s.sound,
    shallowEquals
  )

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
      renderPlayMarker(canvas, start, duration, dispatch.sound.current)
    }, RENDER_MS)
    return () => {
      // Clean up animation rendering on dismount.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [duration])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const renderPlayMarker = (
  canvas,
  start: number,
  duration: number,
  current: Function
) => {
  const percentDone = (current() - start) / duration
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
