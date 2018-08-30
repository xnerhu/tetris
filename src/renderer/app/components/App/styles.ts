import styled from 'styled-components';

import { centerBoth } from '@mixins';

export const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const PlayCanvas = styled.canvas`
  width: 512px;
  height: 512px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.24);

  ${centerBoth()};
`;
