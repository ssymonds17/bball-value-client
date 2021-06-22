import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/seasonView.css';

export default function SeasonNavButton({ link, direction, year }) {
  if (direction === 'prev') {
    return (
      <Link to={link}>
        <button className='season-btn'>
          {`<<`} {Number(year) - 1} Season
        </button>
      </Link>
    );
  } else if (direction === 'next') {
    return (
      <Link to={link}>
        <button className='season-btn'>
          {Number(year) + 1} Season {`>>`}
        </button>
      </Link>
    );
  }
}
