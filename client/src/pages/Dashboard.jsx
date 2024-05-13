import React from 'react';

const Dashboard = ({ itemStatistics }) => {
  return (
    <div>
      <h2>Home Inventory Dashboard</h2>
      <h3>Item Statistics</h3>
      <ul>
        <li>Total Items: {}</li>
        <li>Items in Living Room: {}</li>
        <li>Items in Bedroom: {}</li>
        <li>Items in Kitchen: {}</li>
        <li>Items in Garage: {}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
