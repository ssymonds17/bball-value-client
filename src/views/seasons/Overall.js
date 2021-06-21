import React, { useState, useEffect } from 'react';
import { fetchOverallSeason } from '../../apis/season';
import {
  extractLeague,
  extractYear,
  checkFirstYear,
  checkLastYear
} from '../../helpers/season';
import SeasonsTableOverall from '../../components/seasons/SeasonsTableOverall';
import SeasonNavIndex from '../../components/seasons/SeasonNavIndex';

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
          {checkFirstYear(thisYear, thisLeague) && (
            <SeasonNavIndex
              direction='prev'
              league={thisLeague}
              year={thisYear}
              seasonType={'overall'}
            />
          )}
          {checkLastYear(thisYear, thisLeague) && (
            <SeasonNavIndex
              direction='next'
              league={thisLeague}
              year={thisYear}
              seasonType={'overall'}
            />
          )}
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
