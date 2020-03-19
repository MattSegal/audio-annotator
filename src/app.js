// @flow
import React from 'react'

import { AudioUploadForm, Workbench, Player, FileList, Clip } from 'comps'
import { useSelector, shallowEqual } from 'react-redux'

import type { ClipState, FileState, HowlState } from 'types'

export const App = () => {
  const { howl }: HowlState = useSelector(({ howl }) => howl, shallowEqual)
  const { clips }: ClipState = useSelector(({ clips }) => clips, shallowEqual)
  const { files, file }: FileState = useSelector(
    ({ files }) => files,
    shallowEqual
  )
  if (files.length < 1) {
    return <AudioUploadForm />
  } else if (file && howl) {
    return (
      <Workbench.Container>
        <Workbench.Sidebar>
          <FileList />
        </Workbench.Sidebar>
        <Workbench.BodyOuter>
          <Workbench.BodyInner>
            <Player.Controls />
            <Player.Canvas.Container>
              <Player.Canvas.Layer zIndex={0}>
                <Player.Canvas.ClipDisplay />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={1}>
                <Player.Canvas.Waveform />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={2}>
                <Player.Canvas.ClipAdder />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={3}>
                <Player.Canvas.PlayMarker />
              </Player.Canvas.Layer>
              <Player.Canvas.Layer zIndex={4}>
                <Player.Canvas.ClipControls />
              </Player.Canvas.Layer>
            </Player.Canvas.Container>

            <Clip.Container>
              {clips.map((clip, idx) => (
                <Clip.Item key={idx} idx={idx} clip={clip} />
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
          <FileList />
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
