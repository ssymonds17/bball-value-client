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
import SeasonTypeButton from '../../components/seasons/SeasonTypeButton';
import Loading from '../../components/Loading';
import '../../styles/seasonView.css';

export default function Overall() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  const [initialURL, setInitialURL] = useState('');
  const currentURL = window.location.pathname;

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

  // When navigational buttons to prev and next seasons are clicked another db call is triggered to get the new season data. This is done by checking the old url path to the existing one and looking for discrepencies
  useEffect(() => {
    if (initialURL !== currentURL) {
      setSeasonData(null);
      const league = extractLeague();
      const year = extractYear();
      setThisLeague(league);
      setThisYear(year);
      loadOverallSeason(league, year);
      setInitialURL(window.location.pathname);
    }
  }, [currentURL, initialURL]);

  return (
    <div>
      {!seasonData && (
        <div>
          <Loading />
        </div>
      )}
      {seasonData && (
        <div className='container season-container'>
          <header>
            <h1>
              {thisLeague} {thisYear} Overall Season Statistics
            </h1>
            <section className='season-nav-container'>
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
            </section>
            <section className='season-type-container'>
              <SeasonTypeButton
                league={thisLeague}
                year={thisYear}
                seasonType='Regular Season'
                greatest={false}
              />
              <SeasonTypeButton
                league={thisLeague}
                year={thisYear}
                seasonType='Playoffs'
                greatest={false}
              />
            </section>
          </header>
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
