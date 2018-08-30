import { Field } from '~/interfaces';

import {
  GAME_X_ITEMS_COUNT,
  GAME_Y_ITEMS_COUNT,
  GAME_ITEM_SIZE,
} from '~/constants';

export class GameStore {
  public canvas: HTMLCanvasElement;

  public fields: Field[];

  public render() {
    const ctx = this.canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    for (const item of this.fields) {
      if (
        item.x >= GAME_X_ITEMS_COUNT ||
        item.y >= GAME_Y_ITEMS_COUNT ||
        item.x < 0 ||
        item.y < 0
      ) {
        return console.error('Out of borders', item);
      }

      ctx.beginPath();
      ctx.rect(
        item.x * GAME_ITEM_SIZE,
        item.y * GAME_ITEM_SIZE,
        GAME_ITEM_SIZE,
        GAME_ITEM_SIZE,
      );
      ctx.fillStyle = item.color;
      ctx.fill();
    }
  }
}
