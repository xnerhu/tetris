import { observer } from 'mobx-react';
import React from 'react';

import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '~/constants';
import store from '../../store';
import { StyledApp, GameCanvas } from './styles';
import { shapes } from '~/defaults';

@observer
class App extends React.Component {
  public componentDidMount() {
    store.gameStore.fields = [];

    store.gameStore.addShape(shapes.test, 0, 0);
    store.gameStore.render();
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
