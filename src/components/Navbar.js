import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <Link to={`/`}>
        <button>Home</button>
      </Link>
      <Link to={`/players`}>
        <button>Players</button>
      </Link>
      <Link to={`/teams`}>
        <button>Teams</button>
      </Link>
      <Link to={`/seasons`}>
        <button>Seasons</button>
      </Link>
      <Link to={`/rankings/players`}>
        <button>Greatest Players</button>
      </Link>
      <Link to={`/rankings/teams`}>
        <button>Greatest Teams</button>
      </Link>
      <Link to={`/rankings/seasons/overall`}>
        <button>Greatest Seasons</button>
      </Link>
    </div>
  );
}
