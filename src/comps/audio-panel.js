import React, { useState, useEffect } from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

// https://github.com/goldfire/howler.js#documentation
// https://github.com/goldfire/howler.js/blob/master/examples/sprite/sprite.js
import { Howl } from 'howler'

import { Waveform } from './waveform'

type Props = {
  file: File,
}

export const AudioPanel = ({ file }: Props) => {
  const [isLoop, setLoop] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  // Load file data when file changes
  useEffect(onNewFile(file, sound, setSound, setPlaying), [file])
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

  // sound.seek(seconds)
  // sound.duration (seconds)
  // sound.sounds[0]._seek
  // sound.sounds[0]._start
  // sound.sounds[0]._stop
  // sound.ctx
  window.sound = sound

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
        <Waveform file={file} />
      </Segment>
    )
  }
}

const ActionIcon = styled(Icon)`
  cursor: pointer;
`

const onNewFile = (
  file: File,
  sound: any,
  setSound: Function,
  setPlaying: Function
) => () => {
  if (sound) {
    sound.stop()
  }
  setSound(null)
  setPlaying(false)
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
    newSound.on('end', () => setPlaying(() => false))
  })
  reader.readAsDataURL(file)
}
