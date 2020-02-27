// @flow
import styled from 'styled-components'

import { CANVAS } from 'consts'

export const CanvasWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: ${({ zIndex }) => zIndex};
`
export const CanvasContainer = styled.div`
  width: ${CANVAS.WIDTH}px;
  height: ${CANVAS.HEIGHT}px;
  position: relative;
`
