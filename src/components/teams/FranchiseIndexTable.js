import React from 'react';
import { Link } from 'react-router-dom';

export default function FranchiseIndexTable({ franchiseList }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Team Name</th>
          <th>From</th>
          <th>Until</th>
        </tr>
      </thead>
      <tbody>
        {franchiseList.map((franchise) => {
          return (
            <tr key={franchise.franchise_code}>
              <td>
                <Link to={`/teams/${franchise.franchise_code}`}>
                  {franchise.franchise}
                </Link>
              </td>
              <td>{franchise.first_year}</td>
              <td>{franchise.last_year}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
