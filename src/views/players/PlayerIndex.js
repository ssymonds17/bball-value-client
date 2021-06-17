import React, { useState, useEffect } from 'react';
import { fetchPlayerList } from '../../apis/player';

export default function PlayerIndex() {
  const [playerList, setPlayerList] = useState([]);

  const loadPlayerList = async () => {
    const allPlayers = await fetchPlayerList();
    setPlayerList(allPlayers);
  };

  useEffect(() => {
    loadPlayerList();
  }, []);

  return (
    <div>
      <h1>Player Index</h1>
    </div>
  );
}
