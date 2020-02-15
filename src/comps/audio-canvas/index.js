// @flow
import React from 'react'

import { CanvasWrapper, CanvasContainer } from './container'
import { Waveform } from './waveform'
import { PlayMarker } from './play-marker'

type Props = {
  file: File,
  sound: any,
}

export const AudioCanvas = ({ file, sound }: Props) => (
  <CanvasContainer>
    <CanvasWrapper zIndex={0}>
      <Waveform file={file} />
    </CanvasWrapper>
    <CanvasWrapper zIndex={1}>
      <PlayMarker sound={sound} />
    </CanvasWrapper>
  </CanvasContainer>
)
