import { shapesList, shapeColors } from '~/defaults';
import { Shape } from '~/interfaces';

export const randomize = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomShapeColor = () => {
  const randomIndex = randomize(0, shapeColors.length - 1);
  return shapeColors[randomIndex];
};

export const getRandomShape = () => {
  const randomIndex = randomize(0, shapesList.length - 1);
  return shapesList[randomIndex];
};
