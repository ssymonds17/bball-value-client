import React from 'react';
import { Link } from 'react-router-dom';

export default function SeasonsTableOverall({ playerList, greatest }) {
  let rank = 0;
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          {/* If rendered in greatest seasons page then following 2 rows are also rendered  */}
          {greatest && <th>Year</th>}
          {greatest && <th>League</th>}
          <th>Value</th>
          <th>Team</th>
          <th>Age</th>
          <th>Pos</th>
          <th>Score</th>
          <th>G</th>
          <th>MP</th>
          <th>Val%</th>
          <th>Score</th>
          <th>G</th>
          <th>MP</th>
          <th>Val%</th>
          <th>Tm Record</th>
          <th>Tm Result</th>
        </tr>
      </thead>
      <tbody>
        {playerList.map((player) => {
          return (
            <tr key={player.player_id + player.rs_tm + player.year}>
              <td>{(rank += 1)}</td>
              <td>
                <Link to={`/players/${player.player_id}`}>
                  {player.player_name}
                </Link>
              </td>
              {/* If rendered in greatest seasons page then following 2 rows are also rendered */}
              {greatest && (
                <td>
                  <Link to={`/seasons/overall/${player.league}/${player.year}`}>
                    {player.year}
                  </Link>
                </td>
              )}
              {greatest && (
                <td>
                  <Link to={`/seasons/overall/${player.league}/${player.year}`}>
                    {player.league}
                  </Link>
                </td>
              )}
              <td>{Number(player.season_value).toFixed(2)}</td>
              <td>
                <Link to={`/teams/${player.rs_tm}/${player.year}`}>
                  {player.rs_tm === 'Z-TOT' ? 'TOT' : player.rs_tm}
                </Link>
              </td>
              <td>{player.rs_age}</td>
              <td>{player.rs_pos}</td>
              <td>{Number(player.rs_score).toFixed(2)}</td>
              <td>{player.rs_g}</td>
              <td>{player.rs_mp}</td>
              <td>{player.rs_val_perc}</td>
              <td>{Number(player.po_score).toFixed(2)}</td>
              <td>{player.po_g}</td>
              <td>{player.po_mp}</td>
              <td>{player.po_val_perc}</td>
              <td>{player.tm_record}</td>
              <td>{player.tm_result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
