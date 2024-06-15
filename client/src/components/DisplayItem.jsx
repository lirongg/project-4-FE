import React from 'react';

function DisplayItems({ item }) {

  return (
    <div>
      <p>{item.item}</p>
      <p>{item.location}</p>
      <p>{item.description}</p>
      {item.images && item.images.length > 0 ? (
        <img src={item.images[0]} alt={item.item} style={{ width: '200px', height: 'auto' }} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

export default DisplayItems;
