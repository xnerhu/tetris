import { Point } from '~/interfaces';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_X_COUNT,
  GAME_Y_COUNT,
  GAME_SQUARE_SIZE,
} from '~/constants';
import { Shape } from '~/interfaces/shape';
import { shapesList } from '~/defaults/shapes';

export class GameStore {
  public canvas: HTMLCanvasElement;

  public timer: any;

  public points: Point[] = [];

  public currentShape: Shape;

  public addShape(shape: Shape, x: number, y = 0) {
    this.currentShape = shape;
    this.currentShape.x = x;
    this.currentShape.y = y;
  }

  public willCollide = (
    shape: Shape,
    side: 'top' | 'bottom' | 'left' | 'right',
  ) => {
    const points = this.getShapePoints(shape);

    for (const point of points) {
      const { x, y } = point;
      let sameCoord;

      if (side === 'top') {
        sameCoord = this.points.find(e => e.x === x && e.y === y - 1);
        if (y <= 0) return true;
      }

      if (side === 'bottom') {
        sameCoord = this.points.find(e => e.x === x && e.y === y + 1);
        if (y >= GAME_Y_COUNT - 1) return true;
      }

      if (side === 'right') {
        sameCoord = this.points.find(e => e.x === x + 1 && e.y === y);
        if (x >= GAME_X_COUNT - 1) return true;
      }

      if (side === 'left') {
        sameCoord = this.points.find(e => e.x === x - 1 && e.y === y);
        if (x <= 0) return true;
      }

      if (sameCoord) return true;
    }

    return false;
  };

  public getShapePoints(shape: Shape) {
    const points: Point[] = [];

    for (let i = 0; i < shape.points.length; i++) {
      const point: Point = {
        x: shape.x + shape.points[i].x,
        y: shape.y + shape.points[i].y,
        color: shape.color,
      };

      points.push(point);
    }

    return points;
  }

  private mergeShape(shape: Shape) {
    const points = this.getShapePoints(shape);
    return [...this.points, ...points];
  }

  public pushShape = () => {
    if (this.currentShape == null) return;
    const willCollide = this.willCollide(this.currentShape, 'bottom');

    if (!willCollide) {
      this.currentShape.y++;
    } else {
      this.points = [...this.points, ...this.getShapePoints(this.currentShape)];

      const hash = '0123456789ABCDEF';
      let hashColor = '#';

      for (let i = 0; i < 6; i++) {
        hashColor += hash[Math.floor(Math.random() * hash.length)];
      }

      this.addShape({ ...shapesList.a, ...{ color: hashColor } }, 1, 1);
    }

    this.render();
  };

  public render() {
    const points = this.mergeShape(this.currentShape);
    const ctx = this.canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT);

    for (const point of points) {
      ctx.beginPath();

      ctx.rect(
        point.x * GAME_SQUARE_SIZE,
        point.y * GAME_SQUARE_SIZE,
        GAME_SQUARE_SIZE,
        GAME_SQUARE_SIZE,
      );

      ctx.fillStyle = point.color;
      ctx.fill();
    }
  }
}
