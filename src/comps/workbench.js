// @flow
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

// https://github.com/goldfire/howler.js#documentation
// https://github.com/goldfire/howler.js/blob/master/examples/sprite/sprite.js
import { Howl } from 'howler'

import { AudioControls } from './audio-controls'
import { Waveform } from './waveform'
import { FileList } from './file-list'

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
  const file = files[fileIdx]
  return (
    <WorkbenchGrid>
      <Row>
        <Grid.Column width={4}>
          <FileListWrapper>
            <FileList files={files} fileIdx={fileIdx} />
          </FileListWrapper>
        </Grid.Column>
        <Grid.Column width={12}>
          <AudioWrapper>
            <AudioWrapperInner>
              <AudioControls
                sound={sound}
                file={file}
                isLoop={isLoop}
                setLoop={setLoop}
              />
              <CanvasWrapper>
                <CanvasInner zIndex={0}>
                  <Waveform file={file} />
                </CanvasInner>
              </CanvasWrapper>
            </AudioWrapperInner>
          </AudioWrapper>
        </Grid.Column>
      </Row>
    </WorkbenchGrid>
  )
}

const WorkbenchGrid = styled(Grid)`
  &.ui.grid {
    height: 100vh;
  }
`
const Row = styled(Grid.Row)`
  padding: 0 !important;
`
const CanvasInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: ${({ zIndex }) => zIndex};
`
const CanvasWrapper = styled.div`
  width: 800px;
  height: 200px;
  position: relative;
`
const AudioWrapper = styled.div`
  height: 100vh;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AudioWrapperInner = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const FileListWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding: 1rem;
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
