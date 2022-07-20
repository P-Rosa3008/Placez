function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getBackgroundColours = () => {
  const backgroundColoursArray = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(154, 106, 7, 0.2)",
    "rgba(61, 208, 255, 0.2)",
    "rgba(98, 25, 73, 0.2)",
    "rgba(165, 189, 86, 0.2)",
    "rgba(36, 83, 44, 0.2)",
    "rgba(228, 203, 199, 0.2)",
    "rgba(225, 128, 33, 0.2)",
  ];
  return shuffle(backgroundColoursArray);
};

export const getBorderColour = () => {
  return [...getBackgroundColours()];
};
