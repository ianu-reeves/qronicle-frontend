export const convertDateWithLongMonth = (date) => {
  if (!date) return null;
  const formattedDate = new Date(`${date[0]}-${date[1]}-${date[2]}`);
  return `${formattedDate.toLocaleString('default', { month: 'long' })} ${date[1]}, ${date[0]}`
};

export const convertDateWithBreaksUS = (date) => {
  if (!date) return null;
  return `${date[1]}/${date[2]}/${date[0]}`
};
