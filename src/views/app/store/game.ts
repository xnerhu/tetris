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
  getRandomShape,
} from '~/utils';
import { POINT_BORDER_COLOR, POINT_BORDER_WIDTH, shapesList } from '~/defaults';

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

  public addRandomShape() {
    this.setShape(getRandomShape(), Math.floor(GAME_X_COUNT / 2), 0);
  }

  public pushDown = () => {
    if (this.currentShape == null) return;

    if (!willCollide(this.currentShape, 'bottom')) {
      this.currentShape.y++;
    } else {
      this.points = [...this.points, ...getShapePoints(this.currentShape)];
      this.addRandomShape();

      /* if (willCollide(this.currentShape, 'top') && this.currentShape.y < 4) {
        alert('Game over!');
        return clearInterval(this.timer);
      }*/
    }

    this.checkRows();
    this.render();
  };

  public checkRows = () => {
    for (let y = GAME_Y_COUNT - 1; y >= 0; y--) {
      const points = this.points.filter(e => e.y === y);

      if (points.length === GAME_X_COUNT) {
        for (const point of points) {
          const index = this.points.indexOf(point);
          this.points.splice(index, 1);
        }

        const pointsAbove = this.points.filter(e => e.y < y);

        for (const point of pointsAbove) {
          point.y++;
        }
      }
    }
  };

  public getRotatedPoints = (
    cx: number,
    cy: number,
    x: number,
    y: number,
    angle: number,
  ) => {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = cos * (x - cx) + sin * (y - cy) + cx;
    const ny = cos * (y - cy) - sin * (x - cx) + cy;

    return { x: nx, y: ny };
  };

  public rotate = () => {
    for (const point of this.currentShape.points) {
      const newPoints = this.getRotatedPoints(0, 0, point.x, point.y, 90);

      point.x = Math.round(newPoints.x);
      point.y = Math.round(newPoints.y);
    }
  };
}
