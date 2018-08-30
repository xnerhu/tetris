import { observer } from 'mobx-react';
import React from 'react';

import store from '../../store';
import { StyledApp } from './styles';

@observer
class App extends React.Component {
  public render() {
    return <StyledApp>Test</StyledApp>;
  }
}

export default App;
