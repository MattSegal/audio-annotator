// @flow
import React from 'react'
import styled from 'styled-components'

import { Container, Header } from 'semantic-ui-react'

import { FileDropForm } from './file-drop'

type Props = {
  setFiles: any => void,
}

export const AudioUploadForm = ({ setFiles }: Props) => (
  <FormContainer>
    <Header as="h1" textAlign="center">
      Upload your audio files
    </Header>
    <FileDropForm onUpload={setFiles} />
  </FormContainer>
)

const FormContainer = styled(Container)`
  padding: 6rem 1rem 1rem 1rem;
`
