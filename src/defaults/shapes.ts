import { Shape } from '~/interfaces/shape';

export const shapesList: { [key: string]: Shape } = {
  a: {
    color: 'red',
    points: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
  b: {
    color: 'orange',
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
        x: 1,
        y: 1,
      },
    ],
  },
};
