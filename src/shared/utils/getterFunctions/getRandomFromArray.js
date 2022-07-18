export const getRandomOccurrenceFromArray = (array) => {
  const chooseRandomIndexFromArray = Math.floor(Math.random() * array.length);

  return array[chooseRandomIndexFromArray];
};
