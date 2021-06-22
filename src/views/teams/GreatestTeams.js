import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGreatestTeams } from '../../apis/team';
import Loading from '../../components/Loading';
import '../../styles/greatestTeam.css';

export default function GreatestTeams() {
  const [greatestTeams, setGreatestTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadGreatestTeams = async () => {
    const teams = await fetchGreatestTeams();
    setGreatestTeams(teams);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestTeams();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {!isLoading && greatestTeams && (
        <div className='container g-team-container'>
          <h1>Greatest Teams All Time</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Year</th>
                <th>Total</th>
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {greatestTeams.map((team) => {
                return (
                  <tr key={team.team + team.year}>
                    <td>{team.rank}</td>
                    <td>
                      <Link to={`/teams/${team.team}/${team.year}`}>
                        {team.team}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/seasons/overall/${team.league}/${team.year}`}>
                        {team.year}
                      </Link>
                    </td>
                    <td>{Number(team.total).toFixed(2)}</td>
                    <td>{team.record}</td>
                    <td>{team.result}</td>
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
