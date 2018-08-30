import { observer } from 'mobx-react';
import React from 'react';

import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '~/constants';
import store from '../../store';
import { StyledApp, GameCanvas } from './styles';

@observer
class App extends React.Component {
  public componentDidMount() {
    store.gameStore.fields = [
      {
        x: 0,
        y: 0,
        color: 'red',
      },
      {
        x: 1,
        y: 0,
        color: 'blue',
      },
      {
        x: 0,
        y: 1,
        color: 'yellow',
      },
      {
        x: 1,
        y: 1,
        color: 'green',
      },
    ];

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
