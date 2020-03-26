// @flow
import React, { useEffect } from 'react'
import { List } from 'semantic-ui-react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import type { Dispatch, FileState } from 'types'

// TODO add up and down arrows with w/s
// TODO add number of clips
// TODO don't use browser scroll?
export const FileList = () => {
  const dispatch: Dispatch = useDispatch()
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
      {files.map((f, idx) => (
        <List.Item key={f.name}>
          <List.Icon
            name={`file audio${fileIdx !== idx ? ' outline' : ''}`}
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>{f.name}</List.Header>
            <List.Description>
              {f.type} - {(f.size / 1e6).toFixed(1)} MB
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}
