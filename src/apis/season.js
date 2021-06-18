import axios from 'axios';
import { baseUrl } from './base';

export const fetchSeasonIndex = async () => {
  try {
    const response = await axios.get(`${baseUrl}/seasonindex`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
