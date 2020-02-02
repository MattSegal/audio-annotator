// @flow
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Header, List } from 'semantic-ui-react'

// https://github.com/goldfire/howler.js#documentation
// https://github.com/goldfire/howler.js/blob/master/examples/sprite/sprite.js
import { Howl } from 'howler'

import { AudioControls } from './audio-controls'
import { Waveform } from './waveform'

type Props = {
  files: Array<File>,
}

export const Workbench = ({ files }: Props) => {
  const [fileIdx, setFileIdx] = useState(0)
  const [sound, setSound] = useState(null)
  const [isLoop, setLoop] = useState(false)
  // Handle loop toggle
  useEffect(() => {
    if (sound) {
      sound.loop(isLoop)
    }
  }, [isLoop])
  // Setup keypress event listeners
  useEffect(() => {
    // Navigate files with 'w' / 's' keys
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        setFileIdx(i => (i > 0 ? i - 1 : i))
        setLoop(false)
      } else if (e.code === 'KeyS' || e.code == 'ArrowDown') {
        setFileIdx(i => (i < files.length - 1 ? i + 1 : i))
        setLoop(false)
      }
    })
  }, [])
  // Load file data when file changes
  useEffect(() => onNewFile(files[fileIdx], sound, setSound), [fileIdx])
  return (
    <WorkbenchContainer>
      <Header as="h1" textAlign="center">
        View audio files
      </Header>
      <List divided relaxed>
        {files.map((f, idx) => (
          <List.Item key={f.name}>
            <List.Icon
              name={`file audio${fileIdx !== idx ? ' outline' : ''}`}
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header>{f.name}</List.Header>
              <List.Description>
                {f.type} - {(f.size / 1e6).toFixed(1)} MB
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <AudioControls sound={sound} isLoop={isLoop} setLoop={setLoop} />
      <Waveform file={files[fileIdx]} />
    </WorkbenchContainer>
  )
}

const WorkbenchContainer = styled(Container)`
  padding: 1rem 0;
`

const onNewFile = (file: File, sound: any, setSound: Function) => {
  if (sound) {
    sound.stop()
  }
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
}
