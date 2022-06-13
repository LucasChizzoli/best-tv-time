const MAX_DEX_ID = 5;

export const getRandomMovie: (notThisOne?: number) => number = (notThisOne?: number) => {
  const movieIndex = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (movieIndex !== notThisOne) {
    return movieIndex;
  }

  return getRandomMovie(movieIndex);
}

export const getOptionsForVote = () => {
  const firstId = getRandomMovie();
  const secondId = getRandomMovie(firstId);

  return [firstId, secondId];
}
