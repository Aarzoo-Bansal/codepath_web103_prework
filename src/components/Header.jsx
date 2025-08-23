import React from 'react';
import '../css/components/Header.css';

const Header = ({ backgroundImage }) => {
  return (
    <header className="header">
      <div 
        className="header-background"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      ></div>
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1 className="header-title">CREATORVERSE</h1>
      </div>
    </header>
  );
};

export default Header;
