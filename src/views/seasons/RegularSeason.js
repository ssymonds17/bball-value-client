import React, { useState, useEffect } from 'react';
import { fetchRegularSeason } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';

export default function RegularSeason() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  let rank = 0;

  const loadRegularSeason = async (league, year) => {
    const season = await fetchRegularSeason(league, year);
    setSeasonData(season);
  };

  useEffect(() => {
    const league = extractLeague();
    const year = extractYear();
    setThisLeague(league);
    setThisYear(year);
    loadRegularSeason(league, year);
  }, []);

  return (
    <div>
      {!seasonData && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {seasonData && (
        <div>
          <h1>
            {thisLeague} {thisYear} Regular Season Statistics
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
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {seasonData.map((player) => {
                return (
                  <tr key={player.player_id + player.rs_tm}>
                    <td>{(rank += 1)}</td>
                    <td>{player.player_name}</td>
                    <td>{Number(player.rs_score).toFixed(2)}</td>
                    <td>{player.rs_tm === 'Z-TOT' ? 'TOT' : player.rs_tm}</td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{player.rs_g}</td>
                    <td>{player.rs_mp}</td>
                    <td>{player.rs_val_perc}</td>
                    <td>{player.tm_record}</td>
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
