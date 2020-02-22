// @flow
import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'

import { AudioUploadForm, Workbench } from 'comps'

const App = () => {
  const [files, setFiles] = useState<Array<File>>([])
  if (files.length < 1) {
    return <AudioUploadForm setFiles={setFiles} />
  }
  return <Workbench files={files} />
}

export default hot(App)
