import React from 'react';
import { Link } from 'react-router-dom';

export default function SeasonNavButton({ link, direction, year }) {
  if (direction === 'prev') {
    return (
      <Link to={link}>
        <button>
          {`<<`} {Number(year) - 1} Season
        </button>
      </Link>
    );
  } else if (direction === 'next') {
    return (
      <Link to={link}>
        <button>
          {Number(year) + 1} Season {`>>`}
        </button>
      </Link>
    );
  }
}
