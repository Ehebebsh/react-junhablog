// src/components/Drawer.js
import React from 'react';
import './Drawer.css';

const Drawer = ({ tags, onSelectTag, onShowAll, onClose }) => {
  return (
    <div className="drawer">
      <button className="close-button" onClick={onClose}>X</button>
      <h1>TAG</h1>
      <ul>
        <h2 onClick={onShowAll}>모두 보기</h2>
        {tags.map(tag => (
          <li key={tag} onClick={() => onSelectTag(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
