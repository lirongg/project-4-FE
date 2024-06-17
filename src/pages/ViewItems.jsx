import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../components/DisplayItem';
import { getItems } from '../utilities/items-api';
import Search from '../components/SearchItem';
import DeleteItemButton from '../components/DeleteItemButton';
import './ViewItems.css'; // Import the CSS file for styling

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
    <div className="view-items-page">
      <h2>All Items</h2>
      <div className="search-container">
        <Search setItems={setItems} />
      </div>
      <ul className="items-grid">
        {items.map((item) => (
          <li key={item._id} className="item-container">
            <DisplayItems item={item} />
            <button onClick={() => handleRelocateClick(item._id)}>Critter Relocation</button>
            <DeleteItemButton itemId={item._id} onDeleteSuccess={handleDeleteSuccess} itemName={item.item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewItems;
