import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSeasonIndex } from '../../apis/season';
import Loading from '../../components/Loading';
import '../../styles/seasonIndexView.css';

export default function SeasonIndex() {
  const [seasonsData, setSeasonsData] = useState(null);

  const loadSeasonIndex = async (playerID) => {
    const index = await fetchSeasonIndex(playerID);
    setSeasonsData(index);
  };

  useEffect(() => {
    loadSeasonIndex();
  }, []);

  return (
    <div>
      {!seasonsData && (
        <div className='loading-parent'>
          <Loading />
        </div>
      )}
      {seasonsData && (
        <div className='container season-index-container'>
          <h1>Seasons Index</h1>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>League</th>
                <th>Champions</th>
                <th>Runners Up</th>
                <th>Overall MVP</th>
                <th>Regular Season MVP</th>
                <th>Playoffs MVP</th>
              </tr>
            </thead>
            <tbody>
              {seasonsData.map((season) => {
                return (
                  <tr key={season.year + season.league}>
                    <td>
                      <Link
                        to={`/seasons/overall/${season.league}/${season.year}`}
                      >
                        {season.year}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/seasons/overall/${season.league}/${season.year}`}
                      >
                        {season.league}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`teams/${season.champions_franchise_code}/${season.year}`}
                      >
                        {season.champions}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`teams/${season.runners_up_franchise_code}/${season.year}`}
                      >
                        {season.runners_up}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/players/${season.overall_mvp_player_id}`}>
                        {season.overall_mvp}
                      </Link>{' '}
                      ({season.overall_mvp_score})
                    </td>
                    <td>
                      <Link to={`/players/${season.rs_mvp_player_id}`}>
                        {season.rs_mvp}
                      </Link>{' '}
                      ({season.rs_mvp_score})
                    </td>
                    <td>
                      <Link to={`/players/${season.playoffs_mvp_player_id}`}>
                        {season.playoffs_mvp}
                      </Link>{' '}
                      ({season.playoffs_mvp_score})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
