import { observer } from 'mobx-react';
import React from 'react';

import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_Y_COUNT,
} from '~/constants';
import store from '../../store';
import { StyledApp, GameCanvas } from './styles';
import { shapesList } from '~/defaults';

@observer
class App extends React.Component {
  public componentDidMount() {
    store.gameStore.addShape(shapesList.a, 1, GAME_Y_COUNT - 4);
    store.gameStore.render();

    store.gameStore.timer = setInterval(store.gameStore.moveShape, 400);
  }

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
