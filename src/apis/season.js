import axios from 'axios';
import { baseUrl } from './base';

// Get list of all seasons including champions and MVPs
export const fetchOverallSeason = async (league, year) => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/overall/${league}/${year}`
    );
    console.log(response.data);

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
