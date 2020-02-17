import { getNewClip } from './clip-controls'

const TESTS = [
  {
    name: 'Adding a clip when there are no other clips',
    points: [1, 2],
    clips: [],
    result: [1, 2],
  },
  {
    name: 'Adding a reversed clip when there are no other clips',
    points: [2, 1],
    clips: [],
    result: [1, 2],
  },
  {
    name: 'Add a clip at the start',
    points: [1, 2],
    clips: [
      [3, 4],
      [4, 5],
    ],
    result: [1, 2],
  },
  {
    name: 'Add a clip at the end',
    points: [6, 7],
    clips: [
      [3, 4],
      [4, 5],
    ],
    result: [6, 7],
  },
  {
    name: 'Add a clip in the middle',
    points: [3, 4],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: [3, 4],
  },
  {
    name: 'Add a clip engulfing the first',
    points: [0, 3],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip engulfing the second',
    points: [4, 7],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip engulfing them all',
    points: [0, 7],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first',
    points: [0, 1.5],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second',
    points: [3, 5.5],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first',
    points: [1.5, 3],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second',
    points: [5.5, 7],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the first in reverse',
    points: [3, 1, 5],
    clips: [
      [1, 2],
      [5, 6],
    ],
    result: undefined,
  },
  {
    name: 'Add a clip overlapping the second in reverse',
    points: [7, 5, 5],
    clips: [
      [1, 2],
      [5, 6],
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
