import React from 'react';
import './Header.css';

const Header = ({ title, leftchild, rightchild }) => {
  return (
    <header className="header-wrapper">
        <div>{leftchild}</div>
        <h1>{title}</h1>
        <div>{rightchild}</div>
    </header>
  );
}

export default Header;
