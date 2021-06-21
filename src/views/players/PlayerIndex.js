import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayerList } from '../../apis/player';
import { playerSearch } from '../../helpers/playerSearch';
import Loading from '../../components/Loading';

export default function PlayerIndex() {
  const [playerList, setPlayerList] = useState([]);
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userInput, setUserInput] = useState('');

  const loadPlayerList = async () => {
    const allPlayers = await fetchPlayerList();
    setPlayerList(allPlayers);
    setVisiblePlayers(allPlayers);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPlayerList();
  }, []);

  useEffect(() => {
    const newList = playerSearch(playerList, userInput);
    setVisiblePlayers(newList);
  }, [userInput, playerList]);

  return (
    <div>
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {!isLoading && visiblePlayers && (
        <div>
          <h1>Player Index</h1>
          <label htmlFor='playerSearch'>Search for player: </label>
          <input
            type='text'
            name='playerSearch'
            id='playerSearch'
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {visiblePlayers.map((player) => {
                return (
                  <tr key={player.player_id}>
                    <td>
                      <Link to={`/players/${player.player_id}`}>
                        {player.full_name}
                      </Link>
                    </td>
                    <td>{player.years.slice(0, 4)}</td>
                    <td>{player.years.slice(5)}</td>
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
