// @flow
import React from 'react'
import { List } from 'semantic-ui-react'
import { useSelector, shallowEqual } from 'react-redux'

import type { FileState } from 'types'

// TODO add up and down arrows with w/s
// TODO add number of clips
// TODO don't use browser scroll?
export const FileList = () => {
  const { files, fileIdx }: FileState = useSelector(
    ({ files }) => files,
    shallowEqual
  )
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
