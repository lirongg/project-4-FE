import React from 'react';

const CalculateItem = ({ itemStatistics }) => {
  return (
    <div>
      <h2>Home Inventory Dashboard</h2>
      <h3>Item Statistics</h3>
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
