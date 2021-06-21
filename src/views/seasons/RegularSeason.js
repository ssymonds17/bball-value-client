import React, { useState, useEffect } from 'react';
import { fetchRegularSeason } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';
import SeasonsTable from '../../components/seasons/SeasonsTable';

export default function RegularSeason() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);

  const loadRegularSeason = async (league, year) => {
    const season = await fetchRegularSeason(league, year);
    setSeasonData(season);
  };

  useEffect(() => {
    const league = extractLeague();
    const year = extractYear();
    setThisLeague(league);
    setThisYear(year);
    loadRegularSeason(league, year);
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
            {thisLeague} {thisYear} Regular Season Statistics
          </h1>
          <SeasonsTable
            playerList={seasonData}
            greatest={false}
            seasonType='rs'
          />
        </div>
      )}
    </div>
  );
}
