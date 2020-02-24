// @flow
import React, { useState, useEffect } from 'react'
import { Howl } from 'howler'

import { AudioUploadForm, Workbench } from 'comps'
import { useClips } from './hooks'
import type {
  HowlerSound,
  AudioChunk,
  AudioFile,
  EventClip,
  EventClipState,
} from 'types'

const App = () => {
  const [files, setFiles] = useState<Array<File>>([])
  const [fileIdx, setFileIdx] = useState<number>(0)
  const [sound, setSound] = useState<HowlerSound | null>(null)
  const [isLoop, setLoop] = useState<boolean>(false)
  const [chunkSize, setChunkSize] = useState<number>(400)
  const [chunkIdx, setChunkIdx] = useState<number>(0)

  const { clips, fileClips, addClip, deleteClip } = useClips(files, fileIdx)

  // Load sound data when file changes.
  useEffect(() => {
    const file = files[fileIdx]
    // Remove current sound.
    if (sound) sound.stop()
    setSound(null)
    // Create a new sound.
    const onLoadFile = () => {
      // Load sound once to get duration.
      const s: HowlerSound = new Howl({
        src: reader.result,
        format: getAudioFormat(file),
      })
      const duration = s.duration()
      // Re-create sound with requested sprites
      const sprites = {}
      let chunkStart = 0
      let idx = 0
      while (chunkStart + chunkSize < duration) {
        sprites[idx] = [chunkStart, chunkStart + duration]
        chunkStart += duration
        idx++
      }
      const newSound: HowlerSound = new Howl({
        src: reader.result,
        format: getAudioFormat(file),
        sprites,
      })
      setSound(newSound)
    }
    // Read audio file data into memory.
    const reader = new FileReader()
    reader.addEventListener('load', onLoadFile)
    reader.readAsDataURL(file)
  }, [fileIdx])

  // Handle loop toggle
  useEffect(() => {
    if (sound) {
      sound.loop(isLoop)
    }
  }, [isLoop])

  // Setup keypress event listeners
  // TODO: move to file list displat thing.
  useEffect(() => {
    // Navigate files with 'w' / 's' keys
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        setFileIdx(i => (i > 0 ? i - 1 : i))
        setLoop(false)
      } else if (e.code === 'KeyS' || e.code == 'ArrowDown') {
        setFileIdx(i => (i < files.length - 1 ? i + 1 : i))
        setLoop(false)
      }
    })
  }, [])

  const onLoop = () => setLoop(l => !l)

  const onPlay = () => sound && !sound.playing() && sound.play()
  const onPause = () => sound && sound.pause()
  const onStop = () => sound && sound.stop()

  const currentTime = sound.seek()
  const maxTime = sound._duration

  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  } else {
    return <Workbench files={files} />
  }
}

// Get audio format name from file object (eg 'mp3', 'wav')
const getAudioFormat = (file: File): string =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()
