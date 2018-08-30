import { observer } from 'mobx-react';
import React from 'react';

import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '~/constants';
import store from '../../store';
import { StyledApp, GameCanvas } from './styles';
import { shapesList } from '~/defaults';
import { Shape } from '~/interfaces/shape';

@observer
class App extends React.Component {
  public componentDidMount() {
    let y = 0;

    setInterval(() => {
      store.gameStore.fields = [];
      store.gameStore.addShape(shapesList.test as Shape, 0, y);

      store.gameStore.render();

      y++;
    }, 1000);
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
