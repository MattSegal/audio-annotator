// @flow
import React, { useState } from 'react'

import { AudioUploadForm, Workbench, Player, FileList, Clip } from 'comps'
import { useClips, useFiles, useHowl, useSound } from 'hooks'

export const App = () => {
  // Audio chunk settings
  const [chunkSize, setChunkSize] = useState<number>(400)
  const [chunkIdx, setChunkIdx] = useState<number>(0)

  // User-uploaded files
  const { fileIdx, files, setFiles, setFileIdx } = useFiles()

  // User-tagged audio event clips
  const { clips, fileClips, addClip, deleteClip } = useClips(files, fileIdx)

  // Sounds, created from the current file, segmented into chunks
  const howl = useHowl(fileIdx, files, chunkSize, fileClips)

  // User click-and-drag on player canvas.
  const [dragStart, setDragStart] = useState<number>(0)
  const [dragEnd, setDragEnd] = useState<number>(0)

  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  } else if (howl) {
    const file = files[fileIdx]
    const chunkSprite = `chunk-${chunkIdx}`
    const chunkSound = useSound(howl, chunkSprite)
    return (
      <Workbench.Container>
        <Workbench.Sidebar>
          <FileList
            files={files}
            fileIdx={fileIdx}
            clips={clips}
            setFileIdx={setFileIdx}
          />
        </Workbench.Sidebar>
        <Workbench.BodyOuter>
          <Workbench.BodyInner>
            <Player.Controls
              file={file}
              sound={chunkSound}
              chunkSize={chunkSize}
              chunkIdx={chunkIdx}
              setChunkIdx={setChunkIdx}
              setChunkSize={setChunkSize}
            />
            <Player.Canvas.Container>
              <Player.Canvas.Layer zIndex={0}>
                <Player.Canvas.ClipDisplay clips={fileClips} />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={1}>
                <Player.Canvas.Waveform file={file} />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={2}>
                <Player.Canvas.ClipAdder
                  dragStart={dragStart}
                  dragEnd={dragEnd}
                />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={3}>
                <Player.Canvas.PlayMarker sound={chunkSound} />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={4}>
                <Player.Canvas.ClipControls
                  clips={fileClips}
                  addClip={addClip}
                  dragStart={dragStart}
                  dragEnd={dragEnd}
                  setDragStart={setDragStart}
                  setDragEnd={setDragEnd}
                />
              </Player.Canvas.Layer>
            </Player.Canvas.Container>

            <Clip.Container>
              {fileClips.map((clip, idx) => (
                <Clip.Item
                  key={idx}
                  idx={idx}
                  clip={clip}
                  onDelete={deleteClip}
                />
              ))}
            </Clip.Container>
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
