// @flow
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

import { CANVAS } from 'consts'

import type { FileState, HowlState } from 'types'

const DRAW_OFFSET = 1 / 3 // px
const BUCKET_SIZE = 256

// Renders a waveform to a canvas
export const Waveform = () => {
  const { chunkIdx, chunkSize }: HowlState = useSelector(
    s => s.howl,
    shallowEqual
  )
  const { file }: FileState = useSelector(s => s.files, shallowEqual)
  const canvasRef = useRef(null)
  const { waveform, sampleRate } = useWaveform(file, chunkIdx, chunkSize)
  useEffect(() => renderWaveform(waveform, sampleRate, chunkSize, canvasRef), [
    waveform,
  ])
  return (
    <CanvasEl ref={canvasRef} width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
  )
}

const CanvasEl = styled.canvas`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

// Reads an audio file into a downsampled waveform, which can be rendered to the canvas
const useWaveform = (
  file: File | void,
  chunkIdx: number,
  chunkSize: number
) => {
  const emptyWaveform = new Float32Array(0)
  const [sampleRate, setSampleRate] = useState<number>(0)
  const [waveform, setWaveform] = useState<Float32Array>(emptyWaveform)
  const [fullWaveform, setFullWaveform] = useState<Float32Array>(emptyWaveform)
  useEffect(() => {
    if (!file) return
    // Read file into array buffer
    const readPromise = new Promise(resolve => {
      const reader = new FileReader()
      // @noflow
      reader.onload = (e: ProgressEvent) => resolve(e.target.result)
      reader.readAsArrayBuffer(file)
    })
    // Then do stuff with the array buffer once it's been read.
    readPromise
      .then((buffer: ArrayBuffer) => new AudioContext().decodeAudioData(buffer))
      .then((buffer: AudioBuffer) => {
        // Create offline audio context with decoded audio buffer
        // NB. buffer.length = buffer.duration * buffer.sampleRate
        // @noflow
        const audioCtx = new OfflineAudioContext(
          buffer.numberOfChannels,
          buffer.length,
          buffer.sampleRate
        )
        setSampleRate(buffer.sampleRate)

        // Read audio buffer into buckets so we can draw each bucket, histogram style
        const numBuckets = Math.floor(buffer.length / BUCKET_SIZE)

        let bucketCount = 0
        const bucketArray = new Float32Array(numBuckets)

        // Reduce each buffer chunk into a single value
        const scriptProcessor = audioCtx.createScriptProcessor(
          BUCKET_SIZE,
          2,
          2
        )
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
        audioCtx.startRendering().then(() => setFullWaveform(bucketArray))
      })
  }, [file])
  useEffect(() => {
    if (fullWaveform.length < 1) return
    const chunkWaveForm = getChunkWaveform(
      fullWaveform,
      chunkIdx,
      chunkSize,
      sampleRate
    )
    setWaveform(chunkWaveForm)
  }, [chunkSize, chunkIdx, fullWaveform])
  return {
    waveform,
    sampleRate,
  }
}

const getChunkWaveform = (
  fullWaveform: Float32Array,
  chunkIdx: number,
  chunkSize: number,
  sampleRate: number
) => {
  const chunkStartTime = (chunkIdx * chunkSize) / 1000 // seconds
  const chunkEndTime = ((chunkIdx + 1) * chunkSize) / 1000 // seconds
  const startSamples = chunkStartTime * sampleRate
  const endSamples = chunkEndTime * sampleRate
  const startIdx = startSamples / BUCKET_SIZE
  const endIdx = endSamples / BUCKET_SIZE
  return fullWaveform.slice(startIdx, endIdx)
}

// Renders file waveform to canvas.
const renderWaveform = (
  waveform: Float32Array,
  sampleRate: number,
  chunkSize: number,
  canvasRef: {
    current: HTMLCanvasElement | null,
  }
) => {
  const canvas = canvasRef.current
  if (!canvas || waveform.length < 1) return
  const canvasCtx = canvas.getContext('2d')
  // Clear whatever is already drawn
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
  const playTime = (waveform.length * BUCKET_SIZE) / sampleRate // seconds
  const maxPlayTime = chunkSize / 1000 // seconds
  const playPercent = playTime / maxPlayTime
  const bucketWidth = playPercent * (canvas.width / waveform.length)
  // Draw the bucket array to the canvas
  // @noflow
  const maxVal: number = waveform.reduce((a, b) => Math.max(a, b))
  canvasCtx.fillStyle = '#2185d0'
  for (let i = 0; i < waveform.length; i++) {
    const val = waveform[i] / maxVal
    canvasCtx.fillRect(
      bucketWidth * i - DRAW_OFFSET,
      canvas.height,
      bucketWidth + 2 * DRAW_OFFSET,
      -val * canvas.height
    )
  }
}
