// @flow
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'

import { CANVAS } from 'consts'
import { AudioControls } from './audio-controls'
import { AudioCanvas } from './audio-canvas'
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
    <WorkbenchEl>
      <FileListWrapper>
        <FileList files={files} fileIdx={fileIdx} />
      </FileListWrapper>
      <AudioWrapper>
        <AudioWrapperInner>
          <AudioControls
            sound={sound}
            file={file}
            isLoop={isLoop}
            setLoop={setLoop}
          />
          <AudioCanvas file={file} sound={sound} />
        </AudioWrapperInner>
      </AudioWrapper>
    </WorkbenchEl>
  )
}

const WorkbenchEl = styled.div`
  height: 100vh;
  display: flex;
`
const FileListWrapper = styled.div`
  height: 100vh;
  width: 300px;
  overflow-y: scroll;
  padding: 1rem;
`
const AudioWrapper = styled.div`
  height: 100vh;
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AudioWrapperInner = styled.div`
  width: ${CANVAS.WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
