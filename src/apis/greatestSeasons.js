import axios from 'axios';
import { baseUrl } from './base';

// Get list of greatest overall seasons
export const fetchGreatestOverall = async () => {
  try {
    const response = await axios.get(`${baseUrl}/seasons/rankings/overall`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get list of greatest regular seasons
export const fetchGreatestRS = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/rankings/regularseason`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get list of greatest playoff seasons
export const fetchGreatestPlayoffs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/seasons/rankings/playoffs`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
