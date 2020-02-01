import React, { useState, useEffect, useRef } from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

// https://github.com/goldfire/howler.js#documentation
// https://github.com/goldfire/howler.js/blob/master/examples/sprite/sprite.js
import { Howl } from 'howler'

type Props = {
  file: File,
}

// use canvas, use audio ctx
// requestAnimationFrame
// handle resize

export const AudioPanel = ({ file }: Props) => {
  const animationID = useRef(null)
  const waveformCanvas = useRef(null)
  const [isLoop, setLoop] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  // Load file data when file changes
  useEffect(() => {
    onNewFile(file, canvas, animationID, setSound, setPlaying)
    renderWaveform(file, waveformCanvas.current)
  }, [file])
  // Sound event handlers
  const onPlay = () => {
    if (isPlaying) return
    sound.play()
    setPlaying(true)
  }
  const onPause = () => {
    if (!isPlaying) return
    sound.pause()
    setPlaying(false)
  }
  const onStop = () => {
    if (!isPlaying) return
    sound.stop()
    setPlaying(false)
  }
  const onLoop = () => {
    sound.loop(!isLoop)
    setLoop(!isLoop)
  }

  // sound.seek(seconds)
  // sound.duration (seconds)
  // sound.sounds[0]._seek
  // sound.sounds[0]._start
  // sound.sounds[0]._stop
  // sound.ctx
  window.sound = sound

  if (!sound) {
    return (
      <Segment>
        <Icon size="large" name="ellipsis horizontal" />
      </Segment>
    )
  } else {
    return (
      <Segment>
        <ActionIcon
          title="Play"
          onClick={onPlay}
          size="large"
          name={`play circle${isPlaying ? '' : ' outline'}`}
        />
        <ActionIcon
          title="Pause"
          onClick={onPause}
          size="large"
          name={`pause circle${isPlaying ? ' outline' : ''}`}
        />
        <ActionIcon
          title="Stop"
          onClick={onStop}
          size="large"
          name={`stop circle${isPlaying ? ' outline' : ''}`}
        />
        <ActionIcon
          title="Toggle loop"
          onClick={onLoop}
          size="large"
          name={isLoop ? 'ban' : 'repeat'}
        />
        <CanvasEl ref={canvas} />
      </Segment>
    )
  }
}

const ActionIcon = styled(Icon)`
  cursor: pointer;
`

const onNewFile = (
  file: File,
  animationID: AnimationFrameID | null,
  canvas: HTMLCanvasElement | null,
  setSound: Function,
  setPlaying: Function
) => () => {
  setSound(null)
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    const newSound = new Howl({
      src: reader.result,
      format: file.name
        .split('.')
        .pop()
        .toLowerCase(),
    })
    setSound(newSound)
    newSound.on('end', () => setPlaying(() => false))
    // if (animationID.current) {
    // clearAnimationFrame(animationID.current)
    // }
    // animationID.current = requestAnimationFrame(render(canvas))
    // render(newSound, canvas)()
  })
  reader.readAsDataURL(file)
}

// Renders file waveform to canvas.
// This is relatively expensive to run, so only re-render when file changes.
const renderWaveform = (file: File, canvas: HTMLCanvasElement | null) => () => {
  if (!canvas || !file) return
  const canvasCtx = canvas.getContext('2d')
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

  // https://github.com/MattSegal/music-player/blob/master/src/index.js
  // https://github.com/MattSegal/music-player/blob/master/src/canvas.js
  // https://github.com/MattSegal/music-player/blob/master/src/audio.js
  
  // Get buffer
  const readFile = () => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      if (fileReader.readyState !== 2) return
      const buffer = fileReader.result
      const bucketArray = []
      audioContext.decodeAudioData(buffer, () => {
        const audioCtx = new OfflineAudioContext({
          numberOfChannels: buffer.numberOfChannels,
          length: buffer.length,
          sampleRate: buffer.sampleRate,
        })
        const bufferSize = 4096
        const numBuckets = Math.floor(buffer.length / bufferSize)
        let bucketCount = 0
        const scriptProcessor = audioCtx.createScriptProcessor(bufferSize, 2, 2)
        scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
          const chunkBuffer = e.inputBuffer
          const agg = (a, b) => Math.abs(a) + Math.abs(b)
          const reduceChannel = (c: number) => chunkBuffer.getChannelData(c).reduce(agg)
          const sum = reduceChannel(0) + reduceChannel(1)
          const avg = sum / (2 * chunkBuffer.length)
          bucketArray[bucketCount] = avg
          const played = bucketCount / numBuckets
          bucketCount++
        }



        const offlineSource = audioCtx.createBufferSource()
        scriptProcessor.connect(offlineContext.destination)
        offlineSource.buffer = buffer
        offlineSource.connect(scriptProcessor)
        offlineSource.start()
        offlineContext.startRendering().then(() => {
          const bucketArray = new Float32Array(numBuckets)
          bucketCount = 0
          const start = 0
          const end = 1
          const startBucketCount = Math.floor(numBuckets * start)
          const endBucketCount = Math.floor(numBuckets * end)
          this.bucketCount = this.startBucketCount
          this.bucketWidth = this.canvas.bg.canvas.width / (this.endBucketCount - this.startBucketCount)
          numBucketsInFrame = this.endBucketCount - this.startBucketCount
          this.maxVal = this.bucketArray
            .slice(this.startBucketCount, this.endBucketCount)
            .reduce((a, b) => Math.max(a, b))
          this.redraw()




      })
    })
    fileReader.readAsArrayBuffer(file)
  }


    this.start = start
    this.end = end
    this.startBucketCount = Math.floor(numBuckets * start)
    this.endBucketCount = Math.floor(numBuckets * end)
    this.bucketCount = this.startBucketCount
    this.bucketWidth =
      this.canvas.bg.canvas.width /
      (this.endBucketCount - this.startBucketCount)
    numBucketsInFrame = this.endBucketCount - this.startBucketCount
    this.maxVal = this.bucketArray
      .slice(this.startBucketCount, this.endBucketCount)
      .reduce((a, b) => Math.max(a, b))
    this.redraw()
  })

  sound

  const offlineContext = new OfflineAudioContext({
    numberOfChannels: buffer.numberOfChannels,
    length: buffer.length,
    sampleRate: buffer.sampleRate,
  })
  const scriptProcessor = offlineContext.createScriptProcessor(bufferSize, 2, 2)
  const offlineSource = offlineContext.createBufferSource()

  let bucketCount = this.startBucketCount
  while (bucketCount < this.endBucketCount) {
    const played =
      (bucketCount - this.startBucketCount) / numBucketsInFrame
    const val = this.bucketArray[bucketCount] / this.maxVal
    this.canvas.amp.drawBar(played, val, this.bucketWidth, BLACK)
    bucketCount++
  }
}

const CanvasEl = styled.canvas`
  width: 800px;
  height: 200px;
`
