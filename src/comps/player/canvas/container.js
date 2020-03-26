// @flow
import React from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

export const CanvasContainer = styled.div`
  width: ${CANVAS.WIDTH}px;
  height: ${CANVAS.HEIGHT}px;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`
