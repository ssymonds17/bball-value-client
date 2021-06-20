// Extract the league from the url
export const extractLeague = () => {
  const league = window.location.pathname.slice(-8, -5).toUpperCase();

  return league;
};
// Extract the year from the url
export const extractYear = () => {
  const year = window.location.pathname.slice(-4);
  return year;
};
