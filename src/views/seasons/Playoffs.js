import React, { useState, useEffect } from 'react';
import { fetchPlayoffs } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';

export default function Playoffs() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let rank = 0;

  const loadPlayoffs = async (league, year) => {
    const season = await fetchPlayoffs(league, year);
    setSeasonData(season);
    setIsLoading(false);
  };

  useEffect(() => {
    const league = extractLeague();
    const year = extractYear();
    setThisLeague(league);
    setThisYear(year);
    loadPlayoffs(league, year);
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && seasonData && (
        <div>
          <h1>
            {thisLeague} {thisYear} Playoffs Statistics
          </h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Team</th>
                <th>Age</th>
                <th>Pos</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {seasonData.map((player) => {
                return (
                  <tr key={player.player_id + player.rs_tm}>
                    <td>{(rank += 1)}</td>
                    <td>{player.player_name}</td>
                    <td>{Number(player.po_score).toFixed(2)}</td>
                    <td>{player.rs_tm === 'Z-TOT' ? 'TOT' : player.rs_tm}</td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{player.po_g}</td>
                    <td>{player.po_mp}</td>
                    <td>{player.po_val_perc}</td>
                    <td>{player.tm_result}</td>
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
