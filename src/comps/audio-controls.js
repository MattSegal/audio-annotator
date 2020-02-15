import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

type Props = {
  sound: any,
  file: File,
  isLoop: boolean,
  setLoop: Function,
}

export const AudioControls = ({ sound, file, isLoop, setLoop }: Props) => {
  const onPlay = () => !sound.playing() && sound.play()
  const onPause = () => sound.pause()
  const onStop = () => sound.stop()
  const onLoop = () => setLoop(l => !l)

  if (!sound) {
    return (
      <SegmentEl>
        <Icon size="large" name="ellipsis horizontal" />
      </SegmentEl>
    )
  } else {
    return (
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
        <Header as="h4">{file.name}</Header>
      </SegmentEl>
    )
  }
}

const ActionIcon = styled(Icon)`
  cursor: pointer;
`
const SegmentEl = styled(Segment)`
  width: 100%;
`
