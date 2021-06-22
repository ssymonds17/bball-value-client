import React, { useState, useEffect } from 'react';
import { fetchGreatestOverall } from '../../apis/greatestSeasons';
import SeasonsTableOverall from '../../components/seasons/SeasonsTableOverall';
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';
import Loading from '../../components/Loading';
import '../../styles/seasonView.css';

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
        <div className='container season-container'>
          <header>
            <h1>Greatest Overall Seasons</h1>
            <section className='season-type-container'>
              <SeasonTypeButton seasonType='Regular Season' greatest={true} />
              <SeasonTypeButton seasonType='Playoffs' greatest={true} />
            </section>
          </header>
          <SeasonsTableOverall playerList={greatestSeasons} greatest={true} />
        </div>
      )}
    </div>
  );
}
