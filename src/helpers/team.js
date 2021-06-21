// Extract the team id from the url
export const extractTeamID = () => {
  const code = window.location.pathname.slice(-8, -5).toUpperCase();
  return code;
};
// Extract the year from the url
export const extractYear = () => {
  const year = window.location.pathname.slice(-4);
  return year;
};
// Sort the players by score depending on whether its RS or PO
const sortPlayers = (playerList, seasonType) => {
  switch (seasonType) {
    case 'rs':
      const newRSList = [...playerList];
      newRSList.sort((a, b) => b.rs_mp - a.rs_mp);
      newRSList.sort((a, b) => b.rs_score - a.rs_score);
      return newRSList;
    case 'po':
      const newPOList = [...playerList];
      newPOList.sort((a, b) => b.po_mp - a.po_mp);
      newPOList.sort((a, b) => b.po_score - a.po_score);
      return newPOList;
    default:
      return playerList;
  }
};

// Filter player records that do not have any games/minutes played
const filterPlayers = (playerList, seasonType) => {
  switch (seasonType) {
    case 'rs':
      const filteredRSList = [];
      playerList.forEach((player) => {
        if (player.rs_tm !== '') {
          filteredRSList.push(player);
        }
      });
      return filteredRSList;
    case 'po':
      const filteredPOList = [];
      playerList.forEach((player) => {
        if (player.po_tm !== '') {
          filteredPOList.push(player);
        }
      });
      return filteredPOList;
    default:
      return playerList;
  }
};

// Both filter and sort player lists
export const sanitizeTeamPlayers = (playerList, seasonType) => {
  const filteredPlayers = filterPlayers(playerList, seasonType);
  const sortedPlayers = sortPlayers(filteredPlayers, seasonType);
  return sortedPlayers;
};

// Set styles for navigation buttons. Check first years for the franchise.
export const checkFirstYear = (currentYear, firstYear, franchiseCode) => {
  // Check if current year is equal to first year
  if (currentYear === firstYear) {
    return false;
    // Check if the franchise is CHO and year is 2005 so user cannot navigate to non-existent 2004
  } else if (franchiseCode === 'CHO' && currentYear === 2005) {
    return false;
  } else {
    return true;
  }
};

// Set styles for navigation buttons. Check first and last years for the franchise.
export const checkLastYear = (currentYear, lastYear, franchiseCode) => {
  // Check if current year is equal to last year
  if (currentYear === lastYear) {
    return false;
    // Check if the franchise is CHO and year is 2002 so user cannot navigate to non-existent 2003
  } else if (franchiseCode === 'CHO' && currentYear === 2002) {
    return false;
  } else {
    return true;
  }
};
