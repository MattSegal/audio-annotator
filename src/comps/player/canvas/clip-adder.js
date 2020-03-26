// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { ClipState } from 'types'

export const ClipAdder = () => {
  const { drag }: ClipState = useSelector(s => s.clips, shallowEqual)
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`
