import React, { useState, useEffect } from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

// https://github.com/goldfire/howler.js#documentation
import { Howl } from 'howler'

type Props = {
  file: File,
}

// https://react.semantic-ui.com/elements/icon/#variations-size
// import { Icon } from 'semantic-ui-react'
// <Icon name='home' />
// play circle
// play circle outline
// pause circle
// pause circle outline
// stop circle
// stop circle outline
// repeat

export const AudioPanel = ({ file }: Props) => {
  const [isLoop, setLoop] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  // Load file data when file changes
  useEffect(() => {
    setSound(null)
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const newSound = new Howl({
        src: reader.result,
        format: file.name
          .split('.')
          .pop()
          .toLowerCase(),
      })
      setSound(newSound)
    })
    reader.readAsDataURL(file)
  }, [file])
  // Sound event handlers
  const onPlay = () => {
    if (isPlaying) return
    sound.play()
    setPlaying(true)
  }
  const onPause = () => {
    if (!isPlaying) return
    sound.pause()
    setPlaying(false)
  }
  const onStop = () => {
    if (!isPlaying) return
    sound.stop()
    setPlaying(false)
  }
  const onLoop = () => {
    sound.loop(!isLoop)
    setLoop(!isLoop)
  }

  // sound.seek(1.2)
  // sound.duration
  // sound.ctx

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
          name={`play circle${isPlaying ? '' : ' outline'}`}
        />
        <ActionIcon
          title="Pause"
          onClick={onPause}
          size="large"
          name={`pause circle${isPlaying ? ' outline' : ''}`}
        />
        <ActionIcon
          title="Stop"
          onClick={onStop}
          size="large"
          name={`stop circle${isPlaying ? ' outline' : ''}`}
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
