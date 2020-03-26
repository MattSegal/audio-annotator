// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { SoundState, HowlState } from 'types'

const RENDER_MS = 32 // ~ 30 FPS

// Renders the current play time marker to a canvas
export const PlayMarker = () => {
  const { howl, chunkSize }: HowlState = useSelector(s => s.howl, shallowEqual)
  if (!howl) return null
  const { id: soundId, start }: SoundState = useSelector(
    s => s.sound,
    shallowEqual
  )
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)
  useEffect(() => {
    if (intervalRef.current) {
      // Clean up any existing animations
      clearInterval(intervalRef.current)
    }
    // Start a new animation
    const getCurrentTime = () => 1000 * (soundId ? howl.seek(soundId) : 0)
    intervalRef.current = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      renderPlayMarker(canvas, start, chunkSize, getCurrentTime)
    }, RENDER_MS)
    return () => {
      // Clean up animation rendering on dismount.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [soundId])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const renderPlayMarker = (
  canvas,
  start: number,
  duration: number,
  current: () => number
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
