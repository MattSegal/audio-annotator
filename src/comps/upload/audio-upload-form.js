// @flow
import React from 'react'
import styled from 'styled-components'

import { Container, Header } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'

import { FileDropForm } from './file-drop'

import type { Dispatch } from 'types'

export const AudioUploadForm = () => {
  const dispatch: Dispatch = useDispatch()
  return (
    <FormContainer>
      <Header as="h1" textAlign="center">
        Upload your audio files
      </Header>
      <FileDropForm onUpload={dispatch.files.load} />
    </FormContainer>
  )
}
const FormContainer = styled(Container)`
  padding: 6rem 1rem 1rem 1rem;
`
