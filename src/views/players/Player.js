import React, { useState, useEffect } from 'react';
import { fetchPlayerData } from '../../apis/player';
import {
  extractPlayerID,
  filterSeasons,
  calculateTotals
} from '../../helpers/player';

export default function Player() {
  const [playerRS, setPlayerRS] = useState(null);
  const [playerPO, setPlayerPO] = useState(null);
  const [overallTotal, setOverallTotal] = useState(null);
  const [rsTotal, setRSTotal] = useState(null);
  const [poTotal, setPOTotal] = useState(null);

  const loadPlayerRecord = async (playerID) => {
    const newPlayer = await fetchPlayerData(playerID);
    const rsSeasons = filterSeasons(newPlayer, 'rs');
    const poSeasons = filterSeasons(newPlayer, 'po');
    setOverallTotal(calculateTotals(newPlayer));
    setRSTotal(calculateTotals(newPlayer, 'rs'));
    setPOTotal(calculateTotals(newPlayer, 'po'));
    setPlayerRS(rsSeasons);
    setPlayerPO(poSeasons);
  };

  useEffect(() => {
    const playerID = extractPlayerID();
    loadPlayerRecord(playerID);
  }, []);

  return (
    <div>
      {!playerRS && !playerPO && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {playerRS && playerPO && (
        <div>
          <h1>{playerRS[0].player_name}</h1>
          <p>Overall: {overallTotal}</p>
          <p>Regular Season: {rsTotal}</p>
          <p>Playoffs: {poTotal}</p>
          <h2>Regular Season</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Score</th>
                <th>Lg</th>
                <th>Age</th>
                <th>Team</th>
                <th>Pos</th>
                <th>G</th>
                <th>MPG</th>
                <th>Val%</th>
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {playerRS.map((season) => {
                return (
                  <tr key={season.year + season.rs_score}>
                    <td>{season.year}</td>
                    <td>{season.rs_score}</td>
                    <td>{season.league}</td>
                    <td>{season.rs_age}</td>
                    <td>{season.rs_tm}</td>
                    <td>{season.rs_pos}</td>
                    <td>{season.rs_g}</td>
                    <td>{season.rs_mp}</td>
                    <td>{season.rs_val_perc}</td>
                    <td>{season.tm_record}</td>
                    <td>{season.tm_result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* If no playoff records exist do not display playoff table */}
          {playerPO.length ? (
            <div>
              <h2>Playoffs</h2>
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Lg</th>
                    <th>Age</th>
                    <th>Team</th>
                    <th>Pos</th>
                    <th>G</th>
                    <th>MPG</th>
                    <th>Val%</th>
                    <th>Tm Result</th>
                  </tr>
                </thead>
                <tbody>
                  {playerPO.map((season) => {
                    return (
                      <tr key={season.year + season.po_score}>
                        <td>{season.year}</td>
                        <td>{season.po_score}</td>
                        <td>{season.league}</td>
                        <td>{season.po_age}</td>
                        <td>{season.po_tm}</td>
                        <td>{season.po_pos}</td>
                        <td>{season.po_g}</td>
                        <td>{season.po_mp}</td>
                        <td>{season.po_val_perc}</td>
                        <td>{season.tm_result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
