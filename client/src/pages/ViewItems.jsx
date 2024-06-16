// ViewItems.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../components/DisplayItem';
import { getItems } from '../utilities/items-api';
import Search from '../components/SearchItem';
import DeleteItemButton from '../components/DeleteItemButton'; // Import the new component

function ViewItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
      console.log('Fetched items:', fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleRelocateClick = (itemId) => {
    navigate(`/relocate/${itemId}`); 
  };

  const handleDeleteSuccess = (id) => {
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div>
      <h2>All Items</h2>
      <Search setItems={setItems} />
      <ul>
        {items.map((item) => (
          <div key={item._id}>
            <DisplayItems item={item} />
            <button onClick={() => handleRelocateClick(item._id)}>Critter Relocation</button> 
            <DeleteItemButton itemId={item._id} onDeleteSuccess={handleDeleteSuccess} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ViewItems;
