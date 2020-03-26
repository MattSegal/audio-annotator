// @flow
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'
import { Incrementer } from 'comps/incrementer'

import type { Dispatch, FileState, Clip as ClipType, HowlState } from 'types'

type Props = {
  idx: number,
  clip: ClipType,
}

const ClipItem = ({ idx, clip }: Props) => {
  const dispatch: Dispatch = useDispatch()
  const { howl }: HowlState = useSelector(s => s.howl, shallowEqual)
  const { file }: FileState = useSelector(s => s.files, shallowEqual)
  const filename = file ? file.name : ''
  const onPlay = () => howl && howl.play(`clip-${idx}`)
  return (
    <ClipEl>
      <div>
        <span>
          <strong>Clip {idx + 1}</strong>
        </span>
        <ActionIcon
          title="Play"
          onClick={onPlay}
          size="large"
          name="play outline circle"
        />
        <ActionIcon
          title="Delete"
          onClick={() => dispatch.clips.remove({ filename, clipIdx: idx })}
          size="large"
          name="delete"
        />
      </div>
      <Incrementer
        onPlus={() => dispatch.clips.incrementStart({ filename, clip })}
        onMinus={() => dispatch.clips.decrementStart({ filename, clip })}
      >
        Start {toSeconds(clip.start)}
      </Incrementer>
      <Incrementer
        onPlus={() => dispatch.clips.incrementEnd({ filename, clip })}
        onMinus={() => dispatch.clips.decrementEnd({ filename, clip })}
      >
        End {toSeconds(clip.end)}
      </Incrementer>
    </ClipEl>
  )
}

const toSeconds = (time: number) => (time / 1000).toFixed(2) + 's'

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
`

const ActionIcon = styled(Icon)`
  cursor: pointer;
`

export const Clip = {
  Item: ClipItem,
  Container: ClipContainer,
}
