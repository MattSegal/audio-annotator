// @flow
import React from 'react'
import styled from 'styled-components'

import { Container, Header } from 'semantic-ui-react'

type Props = {
  files: FileList,
}

export const Workbench = ({ files }: Props) => (
  <WorkbenchContainer>
    <Header as="h1" textAlign="center">
      Upload your audio files
    </Header>
  </WorkbenchContainer>
)

const WorkbenchContainer = styled(Container)`
  padding: 1rem 0;
`
