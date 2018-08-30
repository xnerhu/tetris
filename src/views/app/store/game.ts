import { Point } from '~/interfaces';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_SQUARE_SIZE,
  GAME_X_COUNT,
  GAME_Y_COUNT,
} from '~/constants';
import { Shape } from '~/interfaces/shape';
import {
  mergeShape,
  willCollide,
  getShapePoints,
  getRandomShapeColor,
} from '~/utils';
import { shapesList, POINT_BORDER_COLOR, POINT_BORDER_WIDTH } from '~/defaults';

export class GameStore {
  public canvas: HTMLCanvasElement;

  public points: Point[] = [];

  public timer: any;

  public currentShape: Shape;

  public setShape(shape: Shape, x: number, y = 0) {
    this.currentShape = shape;

    this.currentShape.x = x;
    this.currentShape.y = y;
    this.currentShape.color = getRandomShapeColor();
  }

  private drawBorders(
    ctx: CanvasRenderingContext2D,
    direction: 'vertical' | 'horizontal',
  ) {
    const count = direction === 'vertical' ? GAME_X_COUNT : GAME_Y_COUNT;

    for (let i = 0; i < count; i++) {
      ctx.beginPath();

      ctx.lineWidth = POINT_BORDER_WIDTH;
      ctx.strokeStyle = POINT_BORDER_COLOR;

      if (direction === 'vertical') {
        ctx.moveTo(i * GAME_SQUARE_SIZE - 0.5, 0);
        ctx.lineTo(i * GAME_SQUARE_SIZE - 0.5, GAME_CANVAS_HEIGHT);
      } else {
        ctx.moveTo(0, i * GAME_SQUARE_SIZE - 0.5);
        ctx.lineTo(GAME_CANVAS_HEIGHT, i * GAME_SQUARE_SIZE - 0.5);
      }

      ctx.stroke();
    }
  }

  public render() {
    const ctx = this.canvas.getContext('2d');
    const points = mergeShape(this.currentShape);

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

    this.drawBorders(ctx, 'vertical');
    this.drawBorders(ctx, 'horizontal');
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
