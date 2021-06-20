import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGreatestRS } from '../../apis/greatestSeasons';

export default function GreatestRS() {
  const [greatestSeasons, setGreatestSeasons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let rank = 0;

  const loadGreatestRS = async () => {
    const seasons = await fetchGreatestRS();
    setGreatestSeasons(seasons);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGreatestRS();
  }, []);

  return (
    <div>
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isLoading && greatestSeasons && (
        <div>
          <h1>Greatest Regular Seasons</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Year</th>
                <th>League</th>
                <th>Score</th>
                <th>Team</th>
                <th>Age</th>
                <th>Pos</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {greatestSeasons.map((player) => {
                return (
                  <tr key={player.player_id + player.year}>
                    <td>{(rank += 1)}</td>
                    <td>
                      <Link to={`/players/${player.player_id}`}>
                        {player.player_name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/seasons/regularseason/${player.league}/${player.year}`}
                      >
                        {player.year}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/seasons/regularseason/${player.league}/${player.year}`}
                      >
                        {player.league}
                      </Link>
                    </td>
                    <td>{Number(player.rs_score).toFixed(2)}</td>
                    <td>
                      <Link to={`/teams/${player.rs_tm}/${player.year}`}>
                        {player.rs_tm === 'Z-TOT' ? 'TOT' : player.rs_tm}
                      </Link>
                    </td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{player.rs_g}</td>
                    <td>{player.rs_mp}</td>
                    <td>{player.rs_val_perc}</td>
                    <td>{player.tm_record}</td>
                    <td>{player.tm_result}</td>
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
