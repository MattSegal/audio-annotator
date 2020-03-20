// @flow
import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import { useDispatch, useSelector, shallowEquals } from 'react-redux'

import type { Dispatch, SoundState, FileState } from 'types'

// TODO - Allow user to view and set chunk size
// TODO - Allow user to view and set chunk idx
export const Controls = () => {
  const dispatch: Dispatch = useDispatch()
  const { file }: FileState = useSelector(s => s.files, shallowEquals)
  const { isLoop }: SoundState = useSelector(s => s.sound, shallowEquals)
  const fileName = file ? file.name : 'No file selected'
  return (
    <ControlsEl>
      <ActionIcon
        title="Play"
        onClick={dispatch.sound.play}
        size="large"
        name="play outline circle"
      />
      <ActionIcon
        title="Pause"
        onClick={dispatch.sound.pause}
        size="large"
        name="pause outline circle"
      />
      <ActionIcon
        title="Stop"
        onClick={dispatch.sound.stop}
        size="large"
        name="stop outline circle"
      />
      <ActionIcon
        title="Toggle loop"
        onClick={dispatch.sound.toggleLoop}
        size="large"
        name={isLoop ? 'ban' : 'repeat'}
      />
      <Header as="h4">{fileName}</Header>
    </ControlsEl>
  )
}
const ActionIcon = styled(Icon)`
  cursor: pointer;
`
const ControlsEl = styled(Segment)`
  width: 100%;
`
