import { getNewClip } from './utils'

const TESTS = [
  {
    name: 'Adding a clip when there are no other clips',
    points: [1, 2],
    clips: [],
    result: { start: 1, end: 2 },
  },
  {
    name: 'Adding a reversed clip when there are no other clips',
    points: [2, 1],
    clips: [],
    result: { start: 1, end: 2 },
  },
  {
    name: 'Add a clip at the start',
    points: [1, 2],
    clips: [
      { start: 3, end: 4 },
      { start: 4, end: 5 },
    ],
    result: { start: 1, end: 2 },
  },
  {
    name: 'Add a clip at the end',
    points: [6, 7],
    clips: [
      { start: 3, end: 4 },
      { start: 4, end: 5 },
    ],
    result: { start: 6, end: 7 },
  },
  {
    name: 'Add a clip in the middle',
    points: [3, 4],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: { start: 3, end: 4 },
  },
  {
    name: 'Add a clip engulfing the first',
    points: [0, 3],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip engulfing the second',
    points: [4, 7],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip engulfing them all',
    points: [0, 7],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first',
    points: [0, 1.5],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second',
    points: [3, 5.5],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first',
    points: [1.5, 3],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second',
    points: [5.5, 7],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first in reverse',
    points: [3, 1.5],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second in reverse',
    points: [7, 5.5],
    clips: [
      { start: 1, end: 2 },
      { start: 5, end: 6 },
    ],
    result: undefined,
  },
]

describe('Clip Controls', () => {
  for (let { name, points, clips, result } of TESTS) {
    test(name, () => {
      expect(getNewClip(points, clips)).toEqual(result)
    })
  }
})
