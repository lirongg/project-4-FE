import React, { useEffect, useState } from 'react';
import DisplayItems from '../components/DisplayItem';
import { getListing } from '../utilities/users-api';

function ViewItems() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const fetchedItems = await getListing();
      setItems(fetchedItems); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error)
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const editItem = (item) => {
    // Define logic for editing item
  }

  const deleteItem = (itemId) => {
    // Define logic for deleting item
  }

  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          <div key={item.id}>
            <DisplayItems item={item}/>
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ViewItems;
