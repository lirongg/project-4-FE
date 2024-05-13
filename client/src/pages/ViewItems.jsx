import React from 'react';

const ViewItems = ({ items, editItem, deleteItem }) => {
  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Location: {item.location}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewItems;
