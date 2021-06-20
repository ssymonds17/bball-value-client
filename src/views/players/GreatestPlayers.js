import React, { useState, useEffect } from 'react';
import { fetchGreatestPlayers } from '../../apis/player';

export default function GreatestPlayers() {
  const [greatestPlayers, setGreatestPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadGreatestPlayers = async () => {
    const players = await fetchGreatestPlayers();
    setGreatestPlayers(players);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestPlayers();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h1>Greatest Players All Time</h1>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && greatestPlayers && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Value</th>
                <th>Total</th>
                <th>Peak 3</th>
                <th>Consec. 5</th>
                <th>Avg. 82</th>
                <th>Years</th>
              </tr>
            </thead>
            <tbody>
              {greatestPlayers.map((player) => {
                return (
                  <tr key={player.player_id}>
                    <td>{player.rank}</td>
                    <td>{player.full_name}</td>
                    <td>{Number(player.value).toFixed(2)}</td>
                    <td>{Number(player.total).toFixed(2)}</td>
                    <td>{Number(player.peak_3).toFixed(2)}</td>
                    <td>{Number(player.consec_5).toFixed(2)}</td>
                    <td>{Number(player.avg_82).toFixed(2)}</td>
                    <td>{player.years}</td>
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
