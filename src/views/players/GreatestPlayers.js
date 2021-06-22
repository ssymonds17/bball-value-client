import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGreatestPlayers } from '../../apis/player';
import Loading from '../../components/Loading';
import '../../styles/greatestPlayers.css';

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
        <div className='loading-parent'>
          <Loading />
        </div>
      )}
      {!isLoading && greatestPlayers && (
        <div className='container g-players-container'>
          <h1>Greatest Players All Time</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Value</th>
                <th>Total</th>
                <th>Peak 3</th>
                <th>Peak 5</th>
                <th>Season Avg.</th>
                <th>Years</th>
              </tr>
            </thead>
            <tbody>
              {greatestPlayers.map((player) => {
                return (
                  <tr key={player.player_id}>
                    <td>{player.rank}</td>
                    <td>
                      <Link to={`/players/${player.player_id}`}>
                        {player.full_name}
                      </Link>
                    </td>
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
