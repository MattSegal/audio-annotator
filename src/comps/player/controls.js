// @flow
import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import type { Sound } from 'types'

type Props = {
  file: File,
  sound: Sound,
  chunkSize: number,
  chunkIdx: number,
  setChunkSize: number => void,
  setChunkIdx: number => void,
}

export const Controls = ({
  file,
  sound,
  chunkSize,
  chunkIdx,
  setChunkSize,
  setChunkIdx,
}: Props) => {
  const fileName = file.name
  // TODO - Allow user to view and set chunk size
  // TODO - Allow user to view and set chunk idx
  return (
    <ControlsEl>
      <ActionIcon
        title="Play"
        onClick={sound.play}
        size="large"
        name="play outline circle"
      />
      <ActionIcon
        title="Pause"
        onClick={sound.pause}
        size="large"
        name="pause outline circle"
      />
      <ActionIcon
        title="Stop"
        onClick={sound.stop}
        size="large"
        name="stop outline circle"
      />
      <ActionIcon
        title="Toggle loop"
        onClick={sound.toggleLoop()}
        size="large"
        name={sound.isLoop ? 'ban' : 'repeat'}
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
