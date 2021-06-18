import React, { useState, useEffect } from 'react';
import { fetchSeasonIndex } from '../../apis/season';

export default function SeasonIndex() {
  const [seasonsData, setSeasonsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSeasonIndex = async (playerID) => {
    const index = await fetchSeasonIndex(playerID);
    setSeasonsData(index);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSeasonIndex();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && seasonsData && (
        <div>
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
                    <td>{season.year}</td>
                    <td>{season.league}</td>
                    <td>{season.champions}</td>
                    <td>{season.runners_up}</td>
                    <td>
                      {season.overall_mvp} ({season.overall_mvp_score})
                    </td>
                    <td>
                      {season.rs_mvp} ({season.rs_mvp_score})
                    </td>
                    <td>
                      {season.playoffs_mvp} ({season.playoffs_mvp_score})
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
