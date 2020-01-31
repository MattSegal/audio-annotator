// @flow
import React, { useState } from 'react'

import { AudioUploadForm, Workbench } from 'comps'

export const App = () => {
  const [files, setFiles] = useState([])
  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  }
  return <Workbench files={files} />
}
