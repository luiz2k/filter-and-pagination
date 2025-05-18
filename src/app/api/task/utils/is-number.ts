export const isNumber = (number: unknown) => {
  if (!isNaN(Number(number))) {
    return Number(number);
  }

  return false;
};
