# Audio Annotator

View site [here](https://mattsegal.github.io/audio-annotator/)

Workflow

- single label classification
- user reads intro text + views intro video
- user uploads many audio files
- ideally files not loaded into memory immediately (support many files)
- files split into Xs chunks (adjustable?)
- user progresses through files
- user listens to each chunk of file
  - D next chunk, A back chunk, W next file, S prev file
  - user can listen to chunk
  - mouse click and drag to select section
  - drag edges of section to change
  - listen to section
  - delete section
  - sections may not overlap, but can abut
- user can download annotations as JSON file
- annotations stored in localstorage

TODO

- show number of clips in filelist

# Development

- Run dev server: `yarn serve`
- Build assets `yarn build`
- Run linter `yarn lint`
- Apply formatting `yarn format`
