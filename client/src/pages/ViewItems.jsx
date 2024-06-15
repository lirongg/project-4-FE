import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../components/DisplayItem';
import { getItems } from '../utilities/items-api';
import Search from '../components/SearchItem';
import { useNotification } from '../components/NotificationContext';

function ViewItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { notifications, removeNotification } = useNotification();

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

  const handleEdit = (itemId) => {
    navigate(`/edit/${itemId}`);
  };

  const handleNotificationClose = (id) => {
    removeNotification(id);
  };

  return (
    <div>
      <h2>All Items</h2>
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <span>{notification.message}</span>
              <button onClick={() => handleNotificationClose(notification.id)}>Close</button>
            </div>
          ))}
        </div>
      )}
      <Search setItems={setItems} />
      <ul>
        {items.map((item) => (
          <div key={item._id}>
            <DisplayItems
              item={item}
              location={item.location}
              description={item.description}
              image={item.image}
            />
            <button onClick={() => handleEdit(item._id)}>Edit</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ViewItems;
