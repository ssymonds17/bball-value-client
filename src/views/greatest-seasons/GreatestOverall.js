import React, { useState, useEffect } from 'react';
import { fetchGreatestOverall } from '../../apis/greatestSeasons';
import SeasonsTableOverall from '../../components/seasons/SeasonsTableOverall';
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';
import Loading from '../../components/Loading';

export default function GreatestOverall() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <Loading />
        </div>
      )}
      {!isLoading && greatestSeasons && (
        <div className='container' style={{ width: '80vw' }}>
          <h1>Greatest Overall Seasons</h1>
          <SeasonTypeButton seasonType='Regular Season' greatest={true} />
          <SeasonTypeButton seasonType='Playoffs' greatest={true} />
          <SeasonsTableOverall playerList={greatestSeasons} greatest={true} />
        </div>
      )}
    </div>
  );
}
