import React, { useState, useEffect } from 'react';
import { fetchGreatestPlayoffs } from '../../apis/greatestSeasons';
import SeasonsTable from '../../components/seasons/SeasonsTable';
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';
import Loading from '../../components/Loading';

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
          <Loading />
        </div>
      )}
      {!isLoading && greatestSeasons && (
        <div className='container'>
          <h1>Greatest Playoff Seasons</h1>
          <SeasonTypeButton seasonType='Overall' greatest={true} />
          <SeasonTypeButton seasonType='Regular Season' greatest={true} />
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
