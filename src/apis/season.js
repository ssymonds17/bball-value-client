import axios from 'axios';
import { baseUrl } from './base';

// Get list of all player records for particular season sorted by season value
export const fetchOverallSeason = async (league, year) => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/overall/${league}/${year}`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get list of all player records for particular season sorted by rs score
export const fetchRegularSeason = async (league, year) => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/regularseason/${league}/${year}`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get list of all player records for particular season sorted by po score
export const fetchPlayoffs = async (league, year) => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/playoffs/${league}/${year}`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get list of all seasons including champions and MVPs
export const fetchSeasonIndex = async () => {
  try {
    const response = await axios.get(`${baseUrl}/seasonindex`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
