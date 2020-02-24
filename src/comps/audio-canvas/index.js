// @flow
import React, { useState } from 'react'

import { CanvasWrapper, CanvasContainer } from './container'
import { Waveform } from './waveform'
import { PlayMarker } from './play-marker'
import { ClipAdder } from './clip-adder'
import { ClipDisplay } from './clip-display'
import { ClipControls } from './clip-controls'
import { Clip, ClipContainer } from './clip'

import type { AudioClip } from 'types'

type Props = {
  file: File,
  currentTime: number,
  maxTime: number,
  clips: Array<AudioClip>,
  setClips: (Array<AudioClip>) => void,
  deleteClip: number => void,
}

export const AudioCanvas = ({
  file,
  currentTime,
  maxTime,
  clips,
  setClips,
  deleteClip,
}: Props) => {
  const [dragStart, setDragStart] = useState<number>(0)
  const [dragEnd, setDragEnd] = useState<number>(0)
  return (
    <React.Fragment>
      <CanvasContainer>
        <CanvasWrapper zIndex={0}>
          <ClipDisplay clips={clips} />
        </CanvasWrapper>
        <CanvasWrapper zIndex={1}>
          <Waveform file={file} />
        </CanvasWrapper>
        <CanvasWrapper zIndex={2}>
          <ClipAdder dragStart={dragStart} dragEnd={dragEnd} />
        </CanvasWrapper>
        <CanvasWrapper zIndex={3}>
          <PlayMarker time={currentTime} maxTime={maxTime} />
        </CanvasWrapper>
        <CanvasWrapper zIndex={4}>
          <ClipControls
            clips={clips}
            setClips={setClips}
            dragStart={dragStart}
            dragEnd={dragEnd}
            setDragStart={setDragStart}
            setDragEnd={setDragEnd}
          />
        </CanvasWrapper>
      </CanvasContainer>
      <ClipContainer>
        {clips.map((clip, idx) => (
          <Clip key={idx} idx={idx} clip={clip} onDelete={deleteClip} />
        ))}
      </ClipContainer>
    </React.Fragment>
  )
}
