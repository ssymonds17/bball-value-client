import axios from 'axios';
import { baseUrl } from './base';

// Get list of all team seasons by franchise code
export const fetchTeamSeasons = async (franchiseCode) => {
  try {
    const response = await axios.get(`${baseUrl}/teams/${franchiseCode}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Return list of all current franchises
export const fetchCurrentFranchises = async () => {
  try {
    const response = await axios.get(`${baseUrl}/franchiselists/current`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Return list of all defunct franchises
export const fetchDefunctFranchises = async () => {
  try {
    const response = await axios.get(`${baseUrl}/franchiselists/defunct`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
