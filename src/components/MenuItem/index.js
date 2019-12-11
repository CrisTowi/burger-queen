// Libraries
import React from 'react';

// Styles
import './index.scss';

const MenuItem = ({ name, price }) => (
  <div className="menu-item">
    <div className="menu-item-name">
      {name}
    </div>
    <div className="menu-item-price">
      {price}
    </div>
  </div>
)

export default MenuItem;
