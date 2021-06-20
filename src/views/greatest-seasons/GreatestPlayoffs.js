import React, { useState, useEffect } from 'react';
import { fetchGreatestPlayoffs } from '../../apis/greatestSeasons';

export default function GreatestPlayoffs() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let rank = 0;

  const loadGreatestPlayoffs = async () => {
    const seasons = await fetchGreatestPlayoffs();
    setGreatestSeasons(seasons);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestPlayoffs();
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
          <h1>Greatest Playoff Seasons</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Year</th>
                <th>League</th>
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
              {greatestSeasons.map((player) => {
                return (
                  <tr key={player.player_id + player.year}>
                    <td>{(rank += 1)}</td>
                    <td>{player.player_name}</td>
                    <td>{player.year}</td>
                    <td>{player.league}</td>
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
