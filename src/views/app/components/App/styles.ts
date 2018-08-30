import styled from 'styled-components';

import { centerBoth } from '@mixins';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '~/constants';

export const StyledApp = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const GameCanvas = styled.canvas`
  width: ${GAME_CANVAS_WIDTH}px;
  height: ${GAME_CANVAS_HEIGHT}px;
  position: absolute;

  ${centerBoth()};
`;
