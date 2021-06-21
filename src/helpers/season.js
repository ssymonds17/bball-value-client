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

// Set styles for navigation buttons. Check against league for lower bound 1947 or 1968 respectively
export const checkFirstYear = (currentYear, league) => {
  const year = Number(currentYear);
  // Check if NBA season is 1947
  if (year === 1947 && league === 'NBA') {
    return false;
    // Check if ABA season is 1968
  } else if (year === 1968 && league === 'ABA') {
    return false;
  } else {
    return true;
  }
};

// Set styles for navigation buttons. Check against league for upper bound 2020 or 1976 respectively
export const checkLastYear = (currentYear, league) => {
  const year = Number(currentYear);
  // Check if NBA season is 2020
  if (year === 2020 && league === 'NBA') {
    return false;
    // Check if ABA season is 1976
  } else if (year === 1976 && league === 'ABA') {
    return false;
  } else {
    return true;
  }
};
