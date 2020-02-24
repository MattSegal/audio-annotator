// @flow
import React, { useState } from 'react'

import { AudioUploadForm, Workbench } from 'comps'
import { useClips, useFiles, useSound } from './hooks'

export const App = () => {
  // Audio chunk settings
  const [chunkSize, setChunkSize] = useState<number>(400)
  const [chunkIdx, setChunkIdx] = useState<number>(0)
  // User-uploaded files
  const { fileIdx, files, setFiles, setFileIdx } = useFiles()
  const file = files[fileIdx]
  // User-tagged audio event clips
  const { clips, fileClips, addClip, deleteClip } = useClips(files, fileIdx)
  // Sounds, created from the current file, segmented into chunks
  const {} = useSound(fileIdx, files, chunkSize, chunkIdx)

  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  } else {
    return <Workbench files={files} />
  }
}
