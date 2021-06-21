import React from 'react';
import { Link } from 'react-router-dom';

export default function TeamNavButton({ direction, franchiseCode, year }) {
  if (direction === 'prev') {
    return (
      <Link to={`/teams/${franchiseCode}/${year - 1}`}>
        <button>
          {`<<`} {year - 1} Season
        </button>
      </Link>
    );
  } else {
    return (
      <Link to={`/teams/${franchiseCode}/${year + 1}`}>
        <button>
          {year + 1} Season {`>>`}
        </button>
      </Link>
    );
  }
}
