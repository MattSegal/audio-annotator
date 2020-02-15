// @flow
import React, { useState } from 'react'

import { CanvasWrapper, CanvasContainer } from './container'
import { Waveform } from './waveform'
import { PlayMarker } from './play-marker'
import { ClipAdder } from './clip-adder'
import { ClipDisplay } from './clip-display'
import { ClipControls } from './clip-controls'

type Props = {
  file: File,
  sound: any,
}

export const AudioCanvas = ({ file, sound }: Props) => {
  const [clips, setClips] = useState<Array<[number, number]>>([])
  const [dragStart, setDragStart] = useState<number>(0)
  const [dragEnd, setDragEnd] = useState<number>(0)
  return (
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
        <PlayMarker sound={sound} />
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
  )
}
