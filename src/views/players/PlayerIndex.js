import React, { useState, useEffect } from 'react';
import { fetchPlayerList } from '../../apis/player';

export default function PlayerIndex() {
  const [playerList, setPlayerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPlayerList = async () => {
    const allPlayers = await fetchPlayerList();
    setPlayerList(allPlayers);
  };

  useEffect(() => {
    loadPlayerList();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>Player Index</h1>
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {playerList.map((player) => {
              return (
                <tr key={player.player_id}>
                  <td>{player.full_name}</td>
                  <td>{player.years.slice(0, 4)}</td>
                  <td>{player.years.slice(5)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
