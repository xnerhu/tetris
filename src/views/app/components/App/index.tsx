import { observer } from 'mobx-react';
import React from 'react';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_X_COUNT,
  GAME_Y_COUNT,
} from '~/constants';
import store from '../../store';
import { StyledApp, GameCanvas } from './styles';
import { shapesList } from '~/defaults';
import { willCollide } from '~/utils';

@observer
class App extends React.Component {
  componentDidMount() {
    store.gameStore.setShape(shapesList[0], 1, GAME_Y_COUNT - 8);
    store.gameStore.render();

    // store.gameStore.timer = setInterval(store.gameStore.pushDown, 600);

    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  public onKeyDown = (e: KeyboardEvent) => {
    if (
      e.code !== 'ArrowLeft' &&
      e.code !== 'ArrowRight' &&
      e.code !== 'ArrowDown' &&
      e.code !== 'ArrowUp'
    ) {
      return;
    }

    const gameStore = store.gameStore;
    const currentShape = gameStore.currentShape;

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
      if (!willCollide(currentShape, 'top')) {
        currentShape.y--;
      }
    }

    store.gameStore.render();
  };

  public render() {
    return (
      <StyledApp>
        <GameCanvas
          width={GAME_CANVAS_WIDTH}
          height={GAME_CANVAS_HEIGHT}
          innerRef={r => (store.gameStore.canvas = r)}
        />
      </StyledApp>
    );
  }
}

export default App;
