import { Field } from '~/interfaces';

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

  public fields: Field[];

  public validate(item: Field) {
    if (
      item.x >= GAME_X_COUNT ||
      item.y >= GAME_Y_COUNT ||
      item.x < 0 ||
      item.y < 0
    ) {
      return console.error('Out of borders', item);
    }
    return true;
  }

  public render() {
    const ctx = this.canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT);

    for (const item of this.fields) {
      if (!this.validate(item)) return;

      ctx.beginPath();

      ctx.rect(
        item.x * GAME_SQUARE_SIZE,
        item.y * GAME_SQUARE_SIZE,
        GAME_SQUARE_SIZE,
        GAME_SQUARE_SIZE,
      );

      ctx.fillStyle = item.color;
      ctx.fill();
    }
  }

  public addShape(shape: Shape, x: number, y: number) {
    for (const point of shape.points) {
      this.fields.push({
        x: point.x + x,
        y: point.y + y,
        color: shape.color,
      });
    }
  }
}
