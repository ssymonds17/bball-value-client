import React, { useState, useEffect } from 'react';
import { fetchFranchiseCode, fetchFranchiseSeasons } from '../../apis/team';

export default function TeamIndex() {
  const [teamSeasons, setTeamSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTeamSeasons = async (teamAbbrev) => {
    const franchise = await fetchFranchiseCode(teamAbbrev);
    const seasons = await fetchFranchiseSeasons(franchise[0].franchise_code);
    setTeamSeasons(seasons);
    setIsLoading(false);
  };

  const extractFranchiseCode = () => {
    const code = window.location.pathname.slice(-3).toUpperCase();
    return code;
  };

  useEffect(() => {
    const franchiseCode = extractFranchiseCode();
    loadTeamSeasons(franchiseCode);
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h1>Franchise Index</h1>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && (
        <div>
          <h1>Franchise Index</h1>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>League</th>
                <th>Team</th>
                <th>Record</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {teamSeasons.map((season) => {
                return (
                  <tr key={season.year}>
                    <td>{season.year}</td>
                    <td>{season.league}</td>
                    <td>{season.team_full}</td>
                    <td>{season.record}</td>
                    <td>{season.result}</td>
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
