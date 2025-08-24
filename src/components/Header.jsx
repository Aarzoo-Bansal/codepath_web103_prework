import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/Header.css';

const Header = ({ 
  backgroundImage,
  showNavigation = false,
  navigationItems = [],
  title = 'CREATORVERSE',
}) => {
  return (
    <header className="header">
      <div 
        className="header-background"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      ></div>
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1 className="header-title">CREATORVERSE</h1>
        {showNavigation && navigationItems.length > 0 && (
          <div className="header-navigation">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                role="button"
                className={`nav-button ${item.className || ''}`}
                onClick={item.onClick}
              >
                {item.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
