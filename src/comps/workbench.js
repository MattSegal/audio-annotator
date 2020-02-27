// @flow
import React from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'

const Container = styled.div`
  height: 100vh;
  display: flex;
`
const Sidebar = styled.div`
  height: 100vh;
  width: 300px;
  overflow-y: scroll;
  padding: 1rem;
`
const BodyOuter = styled.div`
  height: 100vh;
  padding: 1rem;
`
const BodyInner = styled.div`
  width: ${CANVAS.WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Workbench = {
  Container,
  Sidebar,
  BodyOuter,
  BodyInner,
}
