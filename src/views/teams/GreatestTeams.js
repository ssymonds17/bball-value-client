import React, { useState, useEffect } from 'react';
import { fetchGreatestTeams } from '../../apis/team';

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
          <h1>Greatest Teams All Time</h1>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && greatestTeams && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Year</th>
                <th>League</th>
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
                    <td>{team.team}</td>
                    <td>{team.year}</td>
                    <td>{team.league}</td>
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
