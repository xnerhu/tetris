import { shapeColors } from '~/defaults';

export const randomize = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomShapeColor = () => {
  const randomIndex = randomize(0, shapeColors.length - 1);
  return shapeColors[randomIndex];
};
