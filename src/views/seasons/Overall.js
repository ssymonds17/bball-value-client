import React, { useState, useEffect } from 'react';
import { fetchOverallSeason } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';
import SeasonsTableOverall from '../../components/seasons/SeasonsTableOverall';

export default function Overall() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);

  const loadOverallSeason = async (league, year) => {
    const season = await fetchOverallSeason(league, year);
    setSeasonData(season);
  };

  useEffect(() => {
    const league = extractLeague();
    const year = extractYear();
    setThisLeague(league);
    setThisYear(year);
    loadOverallSeason(league, year);
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
            {thisLeague} {thisYear} Overall Season Statistics
          </h1>
          <SeasonsTableOverall
            playerList={seasonData}
            greatest={false}
            seasonType='overall'
          />
        </div>
      )}
    </div>
  );
}
