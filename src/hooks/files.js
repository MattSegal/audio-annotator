// @flow
import React, { useState, useEffect } from 'react'

export const useFiles = () => {
  const [files, setFiles] = useState<Array<File>>([])
  const [fileIdx, setFileIdx] = useState<number>(0)

  // Setup keypress event listeners
  useEffect(() => {
    // Navigate files with 'w' / 's' keys
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        setFileIdx(i => (i > 0 ? i - 1 : i))
      } else if (e.code === 'KeyS' || e.code == 'ArrowDown') {
        setFileIdx(i => (i < files.length - 1 ? i + 1 : i))
      }
    })
  }, [])

  return { files, fileIdx, setFiles, setFileIdx }
}
