import React from 'react';
import { Link } from 'react-router-dom';

export default function TeamTableRS({ playersPO }) {
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
          <th>MPG</th>
          <th>Val%</th>
        </tr>
      </thead>
      <tbody>
        {playersPO.map((player) => {
          return (
            <tr key={player.player_id}>
              <td>
                <Link to={`/players/${player.player_id}`}>
                  {player.player_name}
                </Link>
              </td>
              <td>{Number(player.po_score).toFixed(2)}</td>
              <td>
                <Link to={`/seasons/playoffs/${player.league}/${player.year}`}>
                  {player.league}
                </Link>
              </td>
              <td>{player.po_age}</td>
              <td>{player.po_pos}</td>
              <td>{player.po_g}</td>
              <td>{player.po_mp}</td>
              <td>{player.po_val_perc}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
