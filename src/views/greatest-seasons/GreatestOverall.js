import React, { useState, useEffect } from 'react';
import { fetchGreatestOverall } from '../../apis/greatestSeasons';
import SeasonsTableOverall from '../../components/seasons/SeasonsTableOverall';

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
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && greatestSeasons && (
        <div>
          <h1>Greatest Overall Seasons</h1>
          <SeasonsTableOverall playerList={greatestSeasons} greatest={true} />
        </div>
      )}
    </div>
  );
}
