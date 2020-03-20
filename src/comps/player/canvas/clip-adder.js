// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEquals } from 'react-redux'

import { CANVAS } from 'consts'

import type { ClipState } from 'types'

export const ClipAdder = () => {
  const { drag }: ClipState = useSelector(s => s.clips, shallowEquals)
  const canvasRef = useRef(null)
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (drag.start && drag.end) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.fillRect(drag.start, 0, drag.end - drag.start, canvas.height)
      }
    })
  }, [drag.start, drag.end])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const CanvasEl = styled.canvas`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
