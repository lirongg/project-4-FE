import React from 'react';
import './DisplayItem.css'; // Import the CSS file for styling

function DisplayItems({ item }) {
  return (
    <div className="item-container">
    {item.images && item.images.length > 0 ? (
      <img src={item.images[0]} alt={item.item} />
    ) : (
      <p className="no-image">No image available</p>
    )}
      <p className="item-name">{item.item}</p>
      <p className="item-location">Location: {item.location}</p>
      <p className="item-description">{item.description}</p>
      
      <p className="created-by">Created by: {item.createdBy ? item.createdBy.name : 'Unknown'}</p>
    </div>
  );
}

export default DisplayItems;
