import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <Link to={`/`}>
          <button className='nav-btn'>Home</button>
        </Link>
        <Link to={`/players`}>
          <button className='nav-btn'>Players</button>
        </Link>
        <Link to={`/teams`}>
          <button className='nav-btn'>Teams</button>
        </Link>
        <Link to={`/seasons`}>
          <button className='nav-btn'>Seasons</button>
        </Link>
        <Link to={`/rankings/players`}>
          <button className='nav-btn'>Greatest Players</button>
        </Link>
        <Link to={`/rankings/teams`}>
          <button className='nav-btn'>Greatest Teams</button>
        </Link>
        <Link to={`/rankings/seasons/overall`}>
          <button className='nav-btn'>Greatest Seasons</button>
        </Link>
      </div>
    </div>
  );
}
