// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

import type { Clip } from 'types'

type Props = {
  clips: Array<Clip>,
}

const RENDER_MS = 64 // ~ 15 FPS

export const ClipDisplay = ({ clips }: Props) => {
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)
  // Draw clips
  useEffect(() => {
    if (intervalRef.current) {
      // Clean up any existing animations
      clearInterval(intervalRef.current)
    }
    // Start a new animation
    intervalRef.current = setInterval(() => {
      requestAnimationFrame(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgba(250, 200, 0, 0.3)'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let clip of clips) {
          ctx.fillRect(clip.start, 0, clip.end - clip.start, canvas.height)
        }
      })
    }, RENDER_MS)
    return () => {
      // Clean up animation rendering on dismount.
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [clips])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const CanvasEl = styled.canvas`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
