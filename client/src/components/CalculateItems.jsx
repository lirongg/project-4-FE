import React from 'react';

const CalculateItem = ({ itemStatistics }) => {
  return (
    <div>
      <h2>Item Statistics</h2>
      <ul>
        <li>Total Items: {itemStatistics.total}</li>
        <li>Items in Living Room: {itemStatistics.livingRoom}</li>
        <li>Items in Bedroom: {itemStatistics.bedroom}</li>
        <li>Items in Kitchen: {itemStatistics.kitchen}</li>
        <li>Items in Garage: {itemStatistics.garage}</li>
      </ul>
    </div>
  );
};

export default CalculateItem;
