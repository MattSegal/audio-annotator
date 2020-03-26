// @flow
import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { Clip, Dispatch, ClipState, FileState, HowlState } from 'types'

export const ClipDelete = () => {
  const dispatch: Dispatch = useDispatch()
  const { file }: FileState = useSelector(s => s.files, shallowEqual)
  const { clips }: ClipState = useSelector(s => s.clips, shallowEqual)
  const { chunkIdx, chunkSize }: HowlState = useSelector(
    s => s.howl,
    shallowEqual
  )
  const startTime = chunkIdx * chunkSize
  const endTime = (chunkIdx + 1) * chunkSize
  if (!file) return null
  return (
    <React.Fragment>
      {clips
        .filter(clip => clip.start >= startTime && clip.end <= endTime)
        .map((clip, idx) => (
          <ButtonEl
            key={`${clip.start}-${clip.end}`}
            icon
            onClick={() =>
              dispatch.clips.remove({ filename: file.name, clipIdx: idx })
            }
            style={{
              left: `${getLeftPx(clip, startTime, endTime)}px`,
            }}
          >
            <Icon name="delete" />
          </ButtonEl>
        ))}
    </React.Fragment>
  )
}

const getLeftPx = (clip: Clip, startTime: number, endTime) => {
  const clipEndPercent = (clip.end - startTime) / (endTime - startTime)
  const clipEndPx = CANVAS.WIDTH * clipEndPercent
  return clipEndPx - 45
}

const ButtonEl = styled(Button)`
  position: absolute;
  top: 5px;
`
