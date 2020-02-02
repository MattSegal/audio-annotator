// @flow
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  file: File,
}

// Renders a waveform to a canvas
export const Waveform = ({ file }: Props) => {
  const canvas = useRef(null)
  useEffect(renderWaveform(file, canvas), [file])
  return <CanvasEl ref={canvas} width={800} height={200} />
}

const CanvasEl = styled.canvas`
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
`

// Renders file waveform to canvas.
// This is relatively expensive to run, so only re-render when file changes.
const renderWaveform = (
  file: File,
  canvasRef: { current: HTMLCanvasElement | null }
) => () => {
  const canvas = canvasRef.current
  if (!canvas || !file) return
  const canvasCtx = canvas.getContext('2d')
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

  // https://github.com/MattSegal/music-player/blob/master/src/index.js
  // https://github.com/MattSegal/music-player/blob/master/src/canvas.js
  // https://github.com/MattSegal/music-player/blob/master/src/audio.js

  // Read file into array buffer
  const readPromise = new Promise(resolve => {
    const reader = new FileReader()
    // @noflow
    reader.onload = (e: ProgressEvent) => resolve(e.target.result)
    reader.readAsArrayBuffer(file)
  })
  readPromise
    .then((buffer: ArrayBuffer) => new AudioContext().decodeAudioData(buffer))
    .then((buffer: AudioBuffer) => {
      // Create offline audio context with decoded audio buffer
      // @noflow
      const audioCtx = new OfflineAudioContext(
        buffer.numberOfChannels,
        buffer.length,
        buffer.sampleRate
      )

      // Read audio buffer into buckets so we can draw each bucket, histogram style
      const bufferSize = 512
      const numBuckets = Math.floor(buffer.length / bufferSize)
      let bucketCount = 0
      const bucketArray = new Float32Array(numBuckets)

      // Reduce each buffer chunk into a single value
      const scriptProcessor = audioCtx.createScriptProcessor(bufferSize, 2, 2)
      scriptProcessor.connect(audioCtx.destination)
      scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
        const chunkBuffer: AudioBuffer = e.inputBuffer
        const agg = (a, b): number => Math.abs(a) + Math.abs(b)
        // @noflow
        const reduceChannel = c => chunkBuffer.getChannelData(c).reduce(agg)
        const sum: number = reduceChannel(0) + reduceChannel(1)
        const avg = sum / (2 * chunkBuffer.length)
        bucketArray[bucketCount] = avg
        bucketCount++
      }

      // Send the audio data from source into the script processor.
      const offlineSource = audioCtx.createBufferSource()
      offlineSource.buffer = buffer
      offlineSource.connect(scriptProcessor)
      offlineSource.start()
      audioCtx.startRendering().then(() => {
        // Draw the bucket array to the canvas
        const bucketWidth = canvas.width / bucketArray.length
        // @noflow
        const maxVal = bucketArray.reduce((a, b) => Math.max(a, b))
        canvasCtx.fillStyle = '#2185d0'
        for (let i = 0; i < bucketArray.length; i++) {
          const val = bucketArray[i] / maxVal
          canvasCtx.fillRect(
            bucketWidth * i,
            canvas.height,
            bucketWidth,
            -val * canvas.height
          )
        }
      })
    })
}
