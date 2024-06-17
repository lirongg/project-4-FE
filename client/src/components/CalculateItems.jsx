import React from 'react';

const CalculateItem = ({ itemStatistics }) => {
  return (
    <div>
      <h2>Item Statistics</h2>
      <ul>
        <li>Total Items: {itemStatistics.total}</li>
        {Object.keys(itemStatistics).map((location) => {
          if (location !== 'total') {
            return (
              <li key={location}>
                Items in {location.charAt(0).toUpperCase() + location.slice(1).replace(/([A-Z])/g, ' $1')}: {itemStatistics[location]}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default CalculateItem;
