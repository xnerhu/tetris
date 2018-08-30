import { Field } from '~/interfaces';

import { GAME_X_COUNT, GAME_Y_COUNT, GAME_SQUARE_SIZE } from '~/constants';

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
}
