// @flow
import React, { useState } from 'react'

import { AudioUploadForm, Workbench, Player, FileList } from 'comps'
import { useClips, useFiles, useHowl, useSound } from './hooks'

export const App = () => {
  // Audio chunk settings
  const [chunkSize, setChunkSize] = useState<number>(400)
  const [chunkIdx, setChunkIdx] = useState<number>(0)

  // User-uploaded files
  const { fileIdx, files, setFiles, setFileIdx } = useFiles()

  // User-tagged audio event clips
  const { clips, fileClips, addClip, deleteClip } = useClips(files, fileIdx)

  // Sounds, created from the current file, segmented into chunks
  const howl = useHowl(fileIdx, files, chunkSize, clips)

  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  } else if (howl) {
    const file = files[fileIdx]
    const chunkSprite = `chunk-${chunkIdx}`
    const chunkSound = useSound(howl, chunkSprite)
    return (
      <Workbench.Container>
        <Workbench.Sidebar>
          <FileList files={files} fileIdx={fileIdx} />
        </Workbench.Sidebar>
        <Workbench.BodyOuter>
          <Workbench.BodyInner>
            <Player.Controls file={file} sound={chunkSound} />
            <AudioCanvas />
          </Workbench.BodyInner>
        </Workbench.BodyOuter>
      </Workbench.Container>
    )
  } else {
    return (
      <Workbench.Container>
        <Workbench.Sidebar>
          <FileList files={files} fileIdx={fileIdx} />
        </Workbench.Sidebar>
        <Workbench.BodyOuter>
          <Workbench.BodyInner>
            <p>Loading sounds...</p>
          </Workbench.BodyInner>
        </Workbench.BodyOuter>
      </Workbench.Container>
    )
  }
}
