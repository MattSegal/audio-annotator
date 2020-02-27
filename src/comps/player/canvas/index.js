// @flow
import React from 'react'

import { CanvasWrapper, CanvasContainer } from './container'
import { Waveform } from './waveform'
import { PlayMarker } from './play-marker'
import { ClipAdder } from './clip-adder'
import { ClipDisplay } from './clip-display'
import { ClipControls } from './clip-controls'

export const Canvas = {
  Container: CanvasContainer,
  Layer: CanvasWrapper,
  Waveform,
  PlayMarker,
  ClipAdder,
  ClipDisplay,
  ClipControls,
}
