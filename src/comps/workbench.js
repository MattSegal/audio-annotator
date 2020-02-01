// @flow
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Header, List } from 'semantic-ui-react'

import { AudioPanel } from './audio-panel'

type Props = {
  files: Array<File>,
}

export const Workbench = ({ files }: Props) => {
  const [activeFile, setActiveFile] = useState(0)
  useEffect(() => {
    // Navigate files with 'w' / 's' keys
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        setActiveFile(i => (i > 0 ? i - 1 : i))
      } else if (e.code === 'KeyS' || e.code == 'ArrowDown') {
        setActiveFile(i => (i < files.length - 1 ? i + 1 : i))
      }
    })
  }, [])
  return (
    <WorkbenchContainer>
      <Header as="h1" textAlign="center">
        View audio files
      </Header>
      <List divided relaxed>
        {files.map((f, idx) => (
          <List.Item key={f.name}>
            <List.Icon
              name={`file audio${activeFile !== idx ? ' outline' : ''}`}
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
      <AudioPanel file={files[activeFile]} />
    </WorkbenchContainer>
  )
}

const WorkbenchContainer = styled(Container)`
  padding: 1rem 0;
`
