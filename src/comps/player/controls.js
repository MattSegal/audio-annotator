// @flow
import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

import type { Sound } from 'types'

type Props = {
  file: File,
  sound: Sound,
}

export const Controls = ({ file, sound }: Props) => {
  const fileName = file.name
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
