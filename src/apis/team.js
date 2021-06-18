import axios from 'axios';
import { baseUrl } from './base';

// Get player records for each team season
export const fetchTeamRecord = async (franchiseCode, year) => {
  try {
    const response = await axios.get(
      `${baseUrl}/seasons/teams/${franchiseCode}/${year}`
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Get franchise code from team abbreviation
export const fetchFranchiseCode = async (teamAbbrev) => {
  try {
    const response = await axios.get(`${baseUrl}/franchiseindex/${teamAbbrev}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

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
