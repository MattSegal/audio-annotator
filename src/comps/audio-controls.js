import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

type Props = {
  fileName: str,
  isLoop: boolean,
  onPlay: () => void,
  onPause: () => void,
  onStop: () => void,
  onLoop: () => void,
}

export const AudioControls = ({
  fileName,
  isLoop,
  onPlay,
  onPause,
  onStop,
  onLoop,
}: Props) => (
  <SegmentEl>
    <ActionIcon
      title="Play"
      onClick={onPlay}
      size="large"
      name="play outline circle"
    />
    <ActionIcon
      title="Pause"
      onClick={onPause}
      size="large"
      name="pause outline circle"
    />
    <ActionIcon
      title="Stop"
      onClick={onStop}
      size="large"
      name="stop outline circle"
    />
    <ActionIcon
      title="Toggle loop"
      onClick={onLoop}
      size="large"
      name={isLoop ? 'ban' : 'repeat'}
    />
    <Header as="h4">{fileName}</Header>
  </SegmentEl>
)

const ActionIcon = styled(Icon)`
  cursor: pointer;
`
const SegmentEl = styled(Segment)`
  width: 100%;
`
