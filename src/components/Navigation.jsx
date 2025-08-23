import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-button">
        VIEW ALL CREATORS
      </Link>
      <Link to="/creators/add" className="nav-button">
        ADD A CREATOR
      </Link>
    </nav>
  );
}

export default Navigation;
