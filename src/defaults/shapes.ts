import { Shape } from '~/interfaces/shape';

export const shapesList: Shape[] = [
  {
    description: 'Line',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
      {
        x: 0,
        y: 3,
      },
    ],
  },
  {
    description: 'Square',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
  {
    description: 'L-shape',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  },
  {
    description: 'J-shape',
    points: [
      {
        x: 0,
        y: 2,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  },
  {
    description: 'Tree',
    points: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
  },
  {
    description: 'Z-shape',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
  },
  {
    description: 'S-shape',
    points: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
  {
    description: 'U-shape',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
  },
  {
    description: 'Plus',
    points: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  },
];

export const shapeColors = [
  '#D50000',
  '#F50057',
  '#AA00FF',
  '#3F51B5',
  '#2979FF',
  '#FFFF00',
  '#FFC107',
  '#C6FF00',
];
