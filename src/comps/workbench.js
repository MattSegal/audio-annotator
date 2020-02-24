// @flow
import React from 'react'
import styled from 'styled-components'

import { CANVAS } from 'consts'
import { AudioControls } from './audio-controls'
import { AudioCanvas } from './audio-canvas'
import { FileList } from './file-list'

type Props = {
  files: Array<File>,
  fileIdx: number,
  currentTime: number,
  maxTime: number,
  isLoop: boolean,
  onPlay: () => void,
  onPause: () => void,
  onStop: () => void,
  onLoop: () => void,
}

export const Workbench = ({
  files,
  fileIdx,
  isLoop,
  currentTime,
  maxTime,
  onPlay,
  onPause,
  onStop,
  onLoop,
}: Props) => {
  const file = files[fileIdx]
  return (
    <WorkbenchEl>
      <FileListWrapper>
        <FileList files={files} fileIdx={fileIdx} />
      </FileListWrapper>
      <AudioWrapper>
        <AudioWrapperInner>
          <AudioControls
            fileName={file.name}
            isLoop={isLoop}
            onPlay={onPlay}
            onPause={onPause}
            onStop={onStop}
            onLoop={onLoop}
          />
          <AudioCanvas
            file={file}
            currentTime={currentTime}
            maxTime={maxTime}
          />
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
`
const AudioWrapperInner = styled.div`
  width: ${CANVAS.WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
