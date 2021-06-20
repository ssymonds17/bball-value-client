import axios from 'axios';
import { baseUrl } from './base';

// Get list of greatest overall seasons
export const fetchGreatestOverall = async () => {
  try {
    const response = await axios.get(`${baseUrl}/seasons/rankings/overall`);
    console.log(response.data);

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
