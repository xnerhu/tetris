import { shapesList } from '~/constants';

export const randomize = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomShape = () => {
  const randomIndex = randomize(0, shapesList.length - 1);
  return shapesList[randomIndex];
};
