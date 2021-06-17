export const playerSearch = (list, input) => {
  input.toLowerCase();
  const filteredList = list.filter((player) =>
    player.full_name.toLowerCase().includes(input)
  );
  return filteredList;
};
