import React from 'react';



function DisplayItems({ item }) {

  return (
    <div className="item-container">
      <p className="item-name">{item.item}</p>
      <p className="item-location">Location: {item.location}</p>
      <p className="item-description">{item.description}</p>
      {item.images && item.images.length > 0 ? (
        <img src={item.images[0]} alt={item.item} style={{ width: '200px', height: '200px' }}/>
      ) : (
        <p className="no-image">No image available</p>
      )}
      <p className="created-by">Created by: {item.createdBy ? item.createdBy.name : 'Unknown'}</p>
    </div>
  );
}

export default DisplayItems;
