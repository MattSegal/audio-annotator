// @flow
import React, { useEffect } from 'react'
import { List } from 'semantic-ui-react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import type { Dispatch, FileState, ClipState } from 'types'

export const FileList = () => {
  const dispatch: Dispatch = useDispatch()
  const { fileClips }: ClipState = useSelector(
    ({ clips }) => clips,
    shallowEqual
  )
  const { files, fileIdx }: FileState = useSelector(
    ({ files }) => files,
    shallowEqual
  )
  useEffect(() => {
    // Navigate files with 'w' / 's' keys or up / down arrows
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        dispatch.files.decrement()
      } else if (e.code === 'KeyS' || e.code == 'ArrowDown') {
        dispatch.files.increment()
      }
    })
  }, [])

  return (
    <List divided relaxed>
      {files.map((f, idx) => {
        const clips = fileClips[f.name]
        const numClips = clips ? clips.length : 0
        return (
          <List.Item key={f.name}>
            <List.Icon
              name={`file audio${fileIdx !== idx ? ' outline' : ''}`}
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header>{f.name}</List.Header>
              <List.Description>
                {f.type} - {(f.size / 1e6).toFixed(1)} MB - {numClips} clips
              </List.Description>
            </List.Content>
          </List.Item>
        )
      })}
    </List>
  )
}
