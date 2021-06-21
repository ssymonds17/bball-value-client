import React, { useState, useEffect } from 'react';
import { fetchPlayoffs } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';
import SeasonsTable from '../../components/seasons/SeasonsTable';

export default function Playoffs() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);

  const loadPlayoffs = async (league, year) => {
    const season = await fetchPlayoffs(league, year);
    setSeasonData(season);
  };

  useEffect(() => {
    const league = extractLeague();
    const year = extractYear();
    setThisLeague(league);
    setThisYear(year);
    loadPlayoffs(league, year);
  }, []);

  return (
    <div>
      {!seasonData && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {seasonData && (
        <div>
          <h1>
            {thisLeague} {thisYear} Playoffs Statistics
          </h1>
          <SeasonsTable
            playerList={seasonData}
            greatest={false}
            seasonType='po'
          />
        </div>
      )}
    </div>
  );
}
