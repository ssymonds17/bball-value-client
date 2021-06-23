import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayerList } from '../../apis/player';
import { playerSearch } from '../../helpers/playerSearch';
import Loading from '../../components/Loading';
import '../../styles/playerIndexView.css';

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
        <div className='loading-parent'>
          <Loading />
        </div>
      )}
      {!isLoading && visiblePlayers && (
        <div className='container player-index-container'>
          <header>
            <h1>Player Index</h1>
            <br />
            <input
              placeholder='Player Search'
              type='text'
              name='playerSearch'
              id='playerSearch'
              autoComplete='off'
              onChange={(e) => setUserInput(e.target.value)}
            ></input>
          </header>
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
