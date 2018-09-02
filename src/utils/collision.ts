import { GAME_Y_COUNT, GAME_X_COUNT } from '~/constants';
import { Shape } from '~/interfaces';
import { getShapePoints } from '~/utils';
import store from '@app/store';

export const willCollide = (
  shape: Shape,
  side: 'top' | 'bottom' | 'left' | 'right',
) => {
  const points = store.gameStore.points;

  for (const point of getShapePoints(shape)) {
    const { x, y } = point;

    if (side === 'top') {
      const sameCoord = points.find(e => e.x === x && e.y === y - 1);
      if (y < 0 || sameCoord) return true;
    }

    if (side === 'bottom') {
      const sameCoord = points.find(e => e.x === x && e.y === y + 1);
      if (y >= GAME_Y_COUNT - 1 || sameCoord) return true;
    }

    if (side === 'right') {
      const sameCoord = points.find(e => e.x === x + 1 && e.y === y);
      if (x >= GAME_X_COUNT - 1 || sameCoord) return true;
    }

    if (side === 'left') {
      const sameCoord = points.find(e => e.x === x - 1 && e.y === y);
      if (x <= 0 || sameCoord) return true;
    }
  }

  return false;
};
