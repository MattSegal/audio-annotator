// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

type Props = {
  dragStart: number,
  dragEnd: number,
}

export const ClipAdder = ({ dragStart, dragEnd }: Props) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (dragStart && dragEnd) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.fillRect(dragStart, 0, dragEnd - dragStart, canvas.height)
      }
    })
  }, [dragStart, dragEnd])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const CanvasEl = styled.canvas`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
