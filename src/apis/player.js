import axios from 'axios';
import { baseUrl } from './base';

export const fetchPlayerData = async (playerID) => {
  try {
    const response = await axios.get(`${baseUrl}/seasons/players/${playerID}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchPlayerList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/players/list`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchGreatestPlayers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/players/greatest`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
