import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/teamView.css';

export default function TeamNavButton({ direction, franchiseCode, year }) {
  if (direction === 'prev') {
    return (
      <Link to={`/teams/${franchiseCode}/${year - 1}`}>
        <button
          className='team-btn team-nav-btn'
          style={{ marginRight: '1rem' }}
        >
          {`<<`} {year - 1} Season
        </button>
      </Link>
    );
  } else {
    return (
      <Link to={`/teams/${franchiseCode}/${year + 1}`}>
        <button className='team-btn team-nav-btn'>
          {year + 1} Season {`>>`}
        </button>
      </Link>
    );
  }
}
