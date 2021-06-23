import React from 'react';
import { Link } from 'react-router-dom';

export default function TeamTableRS({ playersRS }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Lg</th>
          <th>Age</th>
          <th>Pos</th>
          <th>G</th>
          <th>MP</th>
          <th>Val%</th>
        </tr>
      </thead>
      <tbody>
        {playersRS.map((player) => {
          return (
            <tr key={player.player_id}>
              <td>
                <Link to={`/players/${player.player_id}`}>
                  {player.player_name}
                </Link>
              </td>
              <td className='score-column'>
                {Number(player.rs_score).toFixed(2)}
              </td>
              <td>
                <Link
                  to={`/seasons/regularseason/${player.league}/${player.year}`}
                >
                  {player.league}
                </Link>
              </td>
              <td>{player.rs_age}</td>
              <td>{player.rs_pos}</td>
              <td>{player.rs_g}</td>
              <td>{player.rs_mp}</td>
              <td>{player.rs_val_perc}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
