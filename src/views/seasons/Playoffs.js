import React, { useState, useEffect } from 'react';
import { fetchPlayoffs } from '../../apis/season';
import {
  extractLeague,
  extractYear,
  checkFirstYear,
  checkLastYear
} from '../../helpers/season';
import SeasonsTable from '../../components/seasons/SeasonsTable';
import SeasonNavIndex from '../../components/seasons/SeasonNavIndex';
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';

export default function Playoffs() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  const [initialURL, setInitialURL] = useState('');
  const currentURL = window.location.pathname;

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

  // When navigational buttons to prev and next seasons are clicked another db call is triggered to get the new season data. This is done by checking the old url path to the existing one and looking for discrepencies
  useEffect(() => {
    if (initialURL !== currentURL) {
      setSeasonData(null);
      const league = extractLeague();
      const year = extractYear();
      setThisLeague(league);
      setThisYear(year);
      loadPlayoffs(league, year);
      setInitialURL(window.location.pathname);
    }
  }, [currentURL, initialURL]);

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
          {checkFirstYear(thisYear, thisLeague) && (
            <SeasonNavIndex
              direction='prev'
              league={thisLeague}
              year={thisYear}
              seasonType={'po'}
            />
          )}
          {checkLastYear(thisYear, thisLeague) && (
            <SeasonNavIndex
              direction='next'
              league={thisLeague}
              year={thisYear}
              seasonType={'po'}
            />
          )}
          <SeasonTypeButton
            league={thisLeague}
            year={thisYear}
            seasonType='Overall'
            greatest={false}
          />
          <SeasonTypeButton
            league={thisLeague}
            year={thisYear}
            seasonType='Regular Season'
            greatest={false}
          />
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
