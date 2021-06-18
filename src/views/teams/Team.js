import React, { useState, useEffect } from 'react';
import { fetchTeamRecord, fetchFranchiseCode } from '../../apis/team';
import {
  extractTeamID,
  extractYear,
  sanitizeTeamPlayers
} from '../../helpers/team';

export default function Team() {
  const [playersRS, setPlayersRS] = useState([]);
  const [playersPO, setPlayersPO] = useState([]);
  const [franchise, setFranchise] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTeamRecord = async (teamAbbrev, year) => {
    const newFranchise = await fetchFranchiseCode(teamAbbrev);
    const franchiseCode = newFranchise[0].franchise_code;
    const teamPlayers = await fetchTeamRecord(franchiseCode, year);
    const rsPlayers = sanitizeTeamPlayers(teamPlayers, 'rs');
    const poPlayers = sanitizeTeamPlayers(teamPlayers, 'po');
    setPlayersRS(rsPlayers);
    setPlayersPO(poPlayers);
    setFranchise(newFranchise);
    setIsLoading(false);
  };

  useEffect(() => {
    const teamAbbrev = extractTeamID();
    const year = extractYear();
    loadTeamRecord(teamAbbrev, year);
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && (
        <div>
          <h1>Team</h1>
          <h2>Regular Season</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Lg</th>
                <th>Age</th>
                <th>Pos</th>
                <th>G</th>
                <th>MPG</th>
                <th>Val%</th>
              </tr>
            </thead>
            <tbody>
              {playersRS.map((player) => {
                return (
                  <tr key={player.player_id}>
                    <td>{player.player_name}</td>
                    <td>{player.rs_score}</td>
                    <td>{player.league}</td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{player.rs_g}</td>
                    <td>{player.rs_mp}</td>
                    <td>{player.rs_val_perc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Playoffs</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Lg</th>
                <th>Age</th>
                <th>Pos</th>
                <th>G</th>
                <th>MPG</th>
                <th>Val%</th>
              </tr>
            </thead>
            <tbody>
              {playersPO.map((player) => {
                return (
                  <tr key={player.player_id}>
                    <td>{player.player_name}</td>
                    <td>{player.po_score}</td>
                    <td>{player.league}</td>
                    <td>{player.po_age}</td>
                    <td>{player.po_pos}</td>
                    <td>{player.po_g}</td>
                    <td>{player.po_mp}</td>
                    <td>{player.po_val_perc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
