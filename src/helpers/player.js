// Extract the player ID from the url
export const extractPlayerID = () => {
  const id = window.location.pathname.slice(9);
  return id;
};

// Filter player records that do not have any games/minutes played
export const filterSeasons = (list, seasonType) => {
  switch (seasonType) {
    case 'rs':
      const filteredRSList = [];
      list.forEach((season) => {
        if (season.rs_tm !== '') {
          filteredRSList.push(season);
        }
      });
      return filteredRSList;
    case 'po':
      const filteredPOList = [];
      list.forEach((season) => {
        if (season.po_tm !== '') {
          filteredPOList.push(season);
        }
      });
      return filteredPOList;
    default:
      return list;
  }
};

// Calculate total scores
export const calculateTotals = (list, seasonType) => {
  switch (seasonType) {
    case 'rs':
      const rsTotal = calculateRSTotal(list);
      return rsTotal;
    case 'po':
      const poTotal = calculatePOTotal(list);
      return poTotal;
    default:
      const overallTotal = calculateOverallTotal(list);
      return overallTotal;
  }
};

// Calculate players overall career value
const calculateOverallTotal = (list) => {
  let overallArray = [];
  list.forEach((season) => {
    overallArray.push(season.season_value);
  });
  const overallTotal = Number(overallArray.reduce((a, b) => a + b).toFixed(2));
  return overallTotal;
};

// Calculate players overall regular season value
const calculateRSTotal = (list) => {
  let rsArray = [];
  list.forEach((season) => {
    rsArray.push(season.rs_score);
  });
  const rsTotal = Number(rsArray.reduce((a, b) => a + b).toFixed(2));
  return rsTotal;
};

// Calculate players overall playoff value
const calculatePOTotal = (list) => {
  let poArray = [];
  list.forEach((season) => {
    poArray.push(season.po_score);
  });
  if (poArray.length < 1) return 0;
  const poTotal = Number(poArray.reduce((a, b) => a + b).toFixed(2));
  return poTotal;
};
