// @flow
import React, { useState, useEffect } from 'react'

import { CanvasWrapper, CanvasContainer } from './container'
import { Waveform } from './waveform'
import { PlayMarker } from './play-marker'
import { ClipAdder } from './clip-adder'
import { ClipDisplay } from './clip-display'
import { ClipControls } from './clip-controls'
import { Clip, ClipContainer } from './clip'

type Props = {
  file: File,
  sound: any,
}

export const AudioCanvas = ({ file, sound }: Props) => {
  const savedClips = loadClips(file.name)
  const [clips, setClips] = useState<Array<[number, number]>>(savedClips)
  const [dragStart, setDragStart] = useState<number>(0)
  const [dragEnd, setDragEnd] = useState<number>(0)
  useEffect(() => {
    saveClips(file.name, clips)
  }, [clips])
  useEffect(() => {
    setClips(loadClips(file.name))
  }, [file])
  const onDeleteClip = (clipIdx: number) => {
    const newClips = clips.filter((val, idx) => idx !== clipIdx)
    setClips(newClips)
  }
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
      <ClipContainer>
        {clips.map((clip, idx) => (
          <Clip key={idx} idx={idx} clip={clip} onDelete={onDeleteClip} />
        ))}
      </ClipContainer>
    </React.Fragment>
  )
}

const saveClips = (filename: string, clips: Array<[number, number]>) => {
  const clipsStr = JSON.stringify(clips)
  localStorage.setItem(filename, clipsStr)
}

const loadClips = (filename: string): Array<[number, number]> => {
  const clipsStr = localStorage.getItem(filename)
  return clipsStr ? JSON.parse(clipsStr) : []
}
