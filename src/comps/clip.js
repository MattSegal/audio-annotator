// @flow
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { Dispatch, FileState, Clip as ClipType } from 'types'

type Props = {
  idx: number,
  clip: ClipType,
}

const ClipItem = ({ idx, clip }: Props) => {
  const dispatch: Dispatch = useDispatch()
  const { file }: FileState = useSelector(s => s.files, shallowEqual)
  const filename = file ? file.name : ''
  return (
    <ClipEl>
      <span>
        <strong>Clip {idx + 1}</strong>: {toSeconds(clip.start)} to{' '}
        {toSeconds(clip.end)}
      </span>
      <Icon
        name="delete"
        onClick={() => dispatch.clips.remove({ filename, clipIdx: idx })}
      />
    </ClipEl>
  )
}

const toSeconds = (time: number) => (time / 1000).toFixed(1) + 's'

const ClipContainer = styled.div`
  display: grid;
  width: ${CANVAS.WIDTH}px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem 0;
`

const ClipEl = styled.div`
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
  display: flex;
  justify-content: space-between;
`

export const Clip = {
  Item: ClipItem,
  Container: ClipContainer,
}
