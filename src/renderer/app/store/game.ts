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

  public secondShapeTest = false;

  public addShape(shape: Shape, x: number, y = 0) {
    this.currentShape = shape;
    this.currentShape.x = x;
    this.currentShape.y = y;
  }

  private mergeShape(shape: Shape) {
    const points: Point[] = [];

    for (let i = 0; i < shape.points.length; i++) {
      const point: Point = {
        x: shape.x + shape.points[i].x,
        y: shape.y + shape.points[i].y,
        color: shape.color,
      };

      points.push(point);
    }

    for (const point of points) {
      if (point.y + 1 >= GAME_Y_COUNT) {
        this.points = [...this.points, ...points];

        this.currentShape = null;
        // this.onFall();

        return this.points;
      }
    }

    return [...this.points, ...points];
  }

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

  public moveShape = () => {
    if (this.currentShape == null) {
      return clearInterval(this.timer);
    }

    this.currentShape.y++;
    this.render();
  };

  public onFall = () => {
    if (this.secondShapeTest) return;

    this.addShape(shapesList.b, 1);
    this.render();

    this.timer = setInterval(this.moveShape, 400);
    this.secondShapeTest = true;
  };
}
