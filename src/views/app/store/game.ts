import { Point } from '~/interfaces';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_SQUARE_SIZE,
} from '~/constants';
import { Shape } from '~/interfaces/shape';
import { mergeShape, willCollide, getShapePoints } from '~/utils';
import { shapesList } from '~/defaults';

export class GameStore {
  public canvas: HTMLCanvasElement;

  public points: Point[] = [];

  public timer: any;

  public currentShape: Shape;

  public setShape(shape: Shape, x: number, y = 0) {
    this.currentShape = shape;
    this.currentShape.x = x;
    this.currentShape.y = y;
  }

  public render() {
    const points = mergeShape(this.currentShape);
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

  public pushDown = () => {
    if (this.currentShape == null) return;

    if (!willCollide(this.currentShape, 'bottom')) {
      this.currentShape.y++;
    } else {
      this.points = [...this.points, ...getShapePoints(this.currentShape)];

      const hash = '0123456789ABCDEF';
      let hashColor = '#';

      for (let i = 0; i < 6; i++) {
        hashColor += hash[Math.floor(Math.random() * hash.length)];
      }

      this.setShape({ ...shapesList[0], ...{ color: hashColor } }, 1, 1);
    }

    this.render();
  };
}
