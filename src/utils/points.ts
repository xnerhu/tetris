import { Shape, Point } from '~/interfaces';
import store from '~/store';

export const getShapePoints = (shape: Shape) => {
  const points: Point[] = [];

  for (let i = 0; i < shape.points.length; i++) {
    const point = {
      x: shape.x + shape.points[i].x,
      y: shape.y + shape.points[i].y,
      color: shape.color,
    };

    points.push(point);
  }

  return points;
};

export const mergeShape = (shape: Shape) => {
  const points = getShapePoints(shape);
  return [...store.points, ...points];
};
