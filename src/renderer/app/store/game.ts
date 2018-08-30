import { Point } from '~/interfaces';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_X_COUNT,
  GAME_Y_COUNT,
  GAME_SQUARE_SIZE,
} from '~/constants';
import { Shape } from '~/interfaces/shape';

export class GameStore {
  public canvas: HTMLCanvasElement;

  public points: Point[] = [];

  public currentShape: Shape;

  public addShape(shape: Shape, x: number, y = 0) {
    this.currentShape = shape;
    this.currentShape.x = x;
    this.currentShape.y = y;
  }

  private mergeShape(shape: Shape) {
    const points: Point[] = [];

    shape.points.forEach((e: any) => {
      points.push({
        x: shape.x + e.x,
        y: shape.y + e.y,
        color: shape.color,
      });
    });

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
}
