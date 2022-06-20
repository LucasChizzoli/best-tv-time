const MAX_DEX_ID = 514;

export const getRandomDog: (notThisOne?: number) => number = (
  notThisOne?: number
) => {
  const dogIndex = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (dogIndex !== notThisOne) {
    return dogIndex;
  }

  return getRandomDog(dogIndex);
};

export const getOptionsForVote = (): number[] => {
  const firstId = getRandomDog();
  const secondId = getRandomDog(firstId);

  return [firstId, secondId];
};
