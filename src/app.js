// @flow
import React, { useState } from 'react'

import { AudioUploadForm, Workbench } from 'comps'

const App = () => {
  const [files, setFiles] = useState<Array<File>>([])
  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  }
  return <Workbench files={files} />
}

export default App
