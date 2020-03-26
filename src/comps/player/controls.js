// @flow
import React, { useEffect } from 'react'
import { Segment, Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import type {
  Dispatch,
  SoundState,
  FileState,
  HowlState,
  ClipState,
} from 'types'

export const Controls = () => {
  const dispatch: Dispatch = useDispatch()
  const { fileClips }: ClipState = useSelector(s => s.clips, shallowEqual)
  const { files, fileIdx }: FileState = useSelector(s => s.files, shallowEqual)
  const { playbackRate, isLoop }: SoundState = useSelector(
    s => s.sound,
    shallowEqual
  )
  const { chunkIdx, numChunks, chunkSize }: HowlState = useSelector(
    s => s.howl,
    shallowEqual
  )
  useEffect(() => {
    // Navigate files with 'w' / 's' keys or up / down arrows
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        dispatch.howl.decrementChunkIdx()
      } else if (e.code === 'KeyD' || e.code == 'ArrowRight') {
        dispatch.howl.incrementChunkIdx()
      }
    })
  }, [])
  const jsonEncoded = encodeURIComponent(JSON.stringify(fileClips))
  const dataStr = `data:text/json;charset=utf-8,${jsonEncoded}`
  return (
    <ControlsEl>
      <ActionIcon
        title="Play"
        onClick={dispatch.sound.play}
        size="large"
        name="play outline circle"
      />
      <ActionIcon
        title="Pause"
        onClick={dispatch.sound.pause}
        size="large"
        name="pause outline circle"
      />
      <ActionIcon
        title="Stop"
        onClick={dispatch.sound.stop}
        size="large"
        name="stop outline circle"
      />
      <ActionIcon
        title="Toggle loop"
        onClick={dispatch.sound.toggleLoop}
        size="large"
        name={isLoop ? 'ban' : 'repeat'}
      />
      <a href={dataStr} download="clips.json">
        <ActionIcon title="Download" size="large" name="download" />
      </a>
      <Incrementer
        onPlus={dispatch.files.increment}
        onMinus={dispatch.files.decrement}
        plusTip="Up arrow or 'W'"
        minusTip="Down arrow or 'S'"
      >
        File {fileIdx + 1} of {files.length}
      </Incrementer>
      <Incrementer
        onPlus={dispatch.howl.incrementChunkIdx}
        onMinus={dispatch.howl.decrementChunkIdx}
        plusTip="Right arrow or 'D'"
        minusTip="Left arrow or 'A'"
      >
        Chunk {chunkIdx + 1} of {numChunks}
      </Incrementer>
      <Incrementer
        onPlus={dispatch.howl.incrementChunkSize}
        onMinus={dispatch.howl.decrementChunkSize}
      >
        Chunk size {chunkSize} ms
      </Incrementer>
      <Incrementer
        onPlus={dispatch.sound.incrementRate}
        onMinus={dispatch.sound.decrementRate}
      >
        Playback rate {playbackRate.toFixed(1)}
      </Incrementer>
    </ControlsEl>
  )
}

const Incrementer = ({ children, plusTip, minusTip, onPlus, onMinus }: any) => (
  <IncrementerEl>
    <Button icon onClick={onMinus} title={minusTip}>
      <Icon name="minus" />
    </Button>
    <span>{children}</span>
    <Button icon onClick={onPlus} title={plusTip}>
      <Icon name="plus" />
    </Button>
  </IncrementerEl>
)

const IncrementerEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin: 0.3rem 0;
`

const ActionIcon = styled(Icon)`
  cursor: pointer;
`
const ControlsEl = styled(Segment)`
  width: 100%;
`
