import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

type Props = {
  sound: any,
  isLoop: boolean,
  setLoop: Function,
}

// sound.seek(seconds)
// sound.duration (seconds)
// sound.sounds[0]._seek
// sound.sounds[0]._start
// sound.sounds[0]._stop
// sound.ctx
// TODO - display x / y sprites and current time
export const AudioControls = ({ sound, isLoop, setLoop }: Props) => {
  window.sound = sound
  const onPlay = () => !sound.playing() && sound.play()
  const onPause = () => sound.pause()
  const onStop = () => sound.stop()
  const onLoop = () => setLoop(l => !l)

  if (!sound) {
    return (
      <Segment>
        <Icon size="large" name="ellipsis horizontal" />
      </Segment>
    )
  } else {
    return (
      <Segment>
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
      </Segment>
    )
  }
}

const ActionIcon = styled(Icon)`
  cursor: pointer;
`