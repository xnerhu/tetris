import store from '~/store';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from './constants';
import { willCollide } from './utils';

import './styles.css';

window.onload = () => {
  store.canvas = document.getElementById('canvas') as HTMLCanvasElement;
  store.canvas.style.width = `${GAME_CANVAS_WIDTH}px`;
  store.canvas.style.height = `${GAME_CANVAS_HEIGHT}px`;
  store.canvas.setAttribute('width', GAME_CANVAS_WIDTH.toString());
  store.canvas.setAttribute('height', GAME_CANVAS_HEIGHT.toString());

  store.addRandomShape();
  store.render();

  store.timer = setInterval(store.pushDown, 600);
};

window.addEventListener('keydown', (e: KeyboardEvent) => {
  if (
    e.code !== 'ArrowLeft' &&
    e.code !== 'ArrowRight' &&
    e.code !== 'ArrowDown' &&
    e.code !== 'ArrowUp'
  ) {
    return;
  }

  const currentShape = store.currentShape;

  if (e.code === 'ArrowLeft') {
    if (!willCollide(currentShape, 'left')) {
      currentShape.x--;
    }
  } else if (e.code === 'ArrowRight') {
    if (!willCollide(currentShape, 'right')) {
      currentShape.x++;
    }
  } else if (e.code === 'ArrowDown') {
    if (!willCollide(currentShape, 'bottom')) {
      currentShape.y++;
    }
  } else if (e.code === 'ArrowUp') {
    store.rotate();
  }

  store.checkRows();
  store.render();
});
