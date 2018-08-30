import { observer } from 'mobx-react';
import React from 'react';

import store from '../../store';
import { StyledApp, PlayCanvas } from './styles';

@observer
class App extends React.Component {
  public render() {
    return (
      <StyledApp>
        <PlayCanvas innerRef={r => (store.playCanvas = r)} />
      </StyledApp>
    );
  }
}

export default App;
