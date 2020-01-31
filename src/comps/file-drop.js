// @flow
import React, { useRef, useState } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

export const FileDropForm = ({ onUpload }) => {
  const { DropBox, HiddenInput, onClick } = useFileDrop(onUpload)
  return (
    <Segment placeholder>
      <HiddenInput />
      <DropBox>
        <div>Drag and drop here.</div>
      </DropBox>
      <Button primary onClick={onClick}>
        Upload audio files
      </Button>
    </Segment>
  )
}

const useFileDrop = onUpload => {
  const ref = useRef(null)
  const [drag, setDrag] = useState(false)
  const onDragOver = val => e => {
    e.preventDefault()
    setDrag(val)
  }
  const onDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files)
    }
    setDrag(false)
  }
  const onChange = e => {
    const files = e.target.files
    if (files.length > 0) {
      onUpload(files)
    }
  }
  const onClick = () => {
    ref.current.click()
  }
  const HiddenInput = () => (
    <input
      type="file"
      style={{ display: 'none' }}
      onChange={onChange}
      ref={ref}
      multiple
    />
  )
  const DropBox = props => (
    <DropBoxEl
      drag={drag}
      onDragEnter={onDragOver(true)}
      onDragLeave={onDragOver(false)}
      onDragOver={onDragOver(true)}
      onDrop={onDrop}
      {...props}
    >
      {!drag && props.children}
    </DropBoxEl>
  )
  return {
    DropBox,
    HiddenInput,
    onClick,
    drag,
  }
}

const DropBoxEl = styled.div`
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 300px;
  margin: 0 auto 1rem;
  border: 2px dashed #999;
  border-radius: 0.3rem;
  ${({ drag }) =>
    drag &&
    css`
      border: 2px dashed #333;
      background: #2185d0;
      position: relative;
      border-color: #fff;
      &:before {
        content: 'Drop to upload';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        background-color: #2185d0 !important;
        color: #fff;
        width: 100%;
        text-align: center;
        transform: translateY(-50%);
      }
    `}
`
