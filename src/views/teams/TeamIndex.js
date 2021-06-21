import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFranchiseCode, fetchFranchiseSeasons } from '../../apis/team';
import Loading from '../../components/Loading';

export default function TeamIndex() {
  const [teamSeasons, setTeamSeasons] = useState([]);
  const [franchiseName, setFranchiseName] = useState([]);

  const loadTeamSeasons = async (teamAbbrev) => {
    const franchise = await fetchFranchiseCode(teamAbbrev);
    const seasons = await fetchFranchiseSeasons(franchise[0].franchise_code);
    setFranchiseName(franchise[0].team_name);
    setTeamSeasons(seasons);
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
      {!teamSeasons && (
        <div>
          <Loading />
        </div>
      )}
      {teamSeasons && (
        <div>
          <h1>{franchiseName} Franchise Index</h1>
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
                    <td>
                      <Link to={`/teams/${season.team}/${season.year}`}>
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
                      <Link to={`/teams/${season.team}/${season.year}`}>
                        {season.team_full}
                      </Link>
                    </td>
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
