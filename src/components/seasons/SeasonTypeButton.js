import React from 'react';
import { Link } from 'react-router-dom';

export default function SeasonTypeButton({
  league = null,
  year = null,
  seasonType,
  greatest
}) {
  let typeForLink;
  switch (seasonType) {
    case 'Overall':
      typeForLink = 'overall';
      break;
    case 'Regular Season':
      typeForLink = 'regularseason';
      break;
    case 'Playoffs':
      typeForLink = 'playoffs';
      break;
    default:
      typeForLink = 'overall';
      break;
  }

  if (greatest) {
    return (
      <Link to={`/rankings/seasons/${typeForLink}`}>
        <button>{seasonType}</button>
      </Link>
    );
  } else {
    return (
      <Link to={`/seasons/${typeForLink}/${league}/${year}`}>
        <button>{seasonType}</button>
      </Link>
    );
  }
}
