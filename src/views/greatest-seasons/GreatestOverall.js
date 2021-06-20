import React, { useState, useEffect } from 'react';
import { fetchGreatestOverall } from '../../apis/greatestSeasons';

export default function GreatestOverall() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let rank = 0;

  const loadGreatestOverall = async () => {
    const seasons = await fetchGreatestOverall();
    setGreatestSeasons(seasons);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestOverall();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && greatestSeasons && (
        <div>
          <h1>Greatest Overall Seasons</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Year</th>
                <th>League</th>
                <th>Value</th>
                <th>Team</th>
                <th>Age</th>
                <th>Pos</th>
                <th>Score</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Score</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {greatestSeasons.map((player) => {
                return (
                  <tr key={player.player_id + player.year}>
                    <td>{(rank += 1)}</td>
                    <td>{player.player_name}</td>
                    <td>{player.year}</td>
                    <td>{player.league}</td>
                    <td>{Number(player.season_value).toFixed(2)}</td>
                    <td>{player.rs_tm === 'Z-TOT' ? 'TOT' : player.rs_tm}</td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{Number(player.rs_score).toFixed(2)}</td>
                    <td>{player.rs_g}</td>
                    <td>{player.rs_mp}</td>
                    <td>{player.rs_val_perc}</td>
                    <td>{Number(player.po_score).toFixed(2)}</td>
                    <td>{player.po_g}</td>
                    <td>{player.po_mp}</td>
                    <td>{player.po_val_perc}</td>
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
