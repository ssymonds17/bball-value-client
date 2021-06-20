import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayoffs } from '../../apis/season';
import { extractLeague, extractYear } from '../../helpers/season';

export default function Playoffs() {
  const [seasonData, setSeasonData] = useState(null);
  const [thisLeague, setThisLeague] = useState(null);
  const [thisYear, setThisYear] = useState(null);
  let rank = 0;

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
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Team</th>
                <th>Age</th>
                <th>Pos</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {seasonData.map((player) => {
                return (
                  <tr key={player.player_id + player.rs_tm}>
                    <td>{(rank += 1)}</td>
                    <td>
                      <Link to={`/players/${player.player_id}`}>
                        {player.player_name}
                      </Link>
                    </td>
                    <td>{Number(player.po_score).toFixed(2)}</td>
                    <td>
                      <Link to={`/teams/${player.po_tm}/${player.year}`}>
                        {player.po_tm}
                      </Link>
                    </td>
                    <td>{player.rs_age}</td>
                    <td>{player.rs_pos}</td>
                    <td>{player.po_g}</td>
                    <td>{player.po_mp}</td>
                    <td>{player.po_val_perc}</td>
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
