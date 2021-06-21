import React, { useState, useEffect } from 'react';
import { fetchGreatestPlayoffs } from '../../apis/greatestSeasons';
import SeasonsTable from '../../components/seasons/SeasonsTable';

export default function GreatestPlayoffs() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <SeasonsTable
            playerList={greatestSeasons}
            greatest={true}
            seasonType='po'
          />
        </div>
      )}
    </div>
  );
}
