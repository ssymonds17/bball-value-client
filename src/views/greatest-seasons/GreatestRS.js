import React, { useState, useEffect } from 'react';
import { fetchGreatestRS } from '../../apis/greatestSeasons';
import SeasonsTable from '../../components/seasons/SeasonsTable';
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';
import Loading from '../../components/Loading';
import '../../styles/seasonView.css';

export default function GreatestRS() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadGreatestRS = async () => {
    const seasons = await fetchGreatestRS();
    setGreatestSeasons(seasons);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestRS();
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
            <h1>Greatest Regular Seasons</h1>
            <section className='season-type-container'>
              <SeasonTypeButton seasonType='Overall' greatest={true} />
              <SeasonTypeButton seasonType='Playoffs' greatest={true} />
            </section>
          </header>
          <SeasonsTable
            playerList={greatestSeasons}
            greatest={true}
            seasonType='rs'
          />
        </div>
      )}
    </div>
  );
}
