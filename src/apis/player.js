import axios from 'axios';
import { baseUrl } from './base';

export const fetchPlayerList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/players/list`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
