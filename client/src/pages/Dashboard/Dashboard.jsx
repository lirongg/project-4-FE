import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalculateItems from '../components/CalculateItems';
import { getItems } from '../utilities/items-api';
import { useNotification } from '../components/NotificationContext';
import Navbar from './Navbar';

function Dashboard({ user, setUser }) {
  const [items, setItems] = useState([]);
  const [itemStatistics, setItemStatistics] = useState({
    total: 0,
    livingRoom: 0,
    bedroom: 0,
    kitchen: 0,
    garage: 0,
  });

  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);
      calculateStatistics(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const calculateStatistics = (items) => {
    const stats = {
      total: items.length,
      livingRoom: 0,
      bedroom: 0,
      kitchen: 0,
      garage: 0,
    };

    items.forEach((item) => {
      if (item.location === 'Living Room') stats.livingRoom += 1;
      if (item.location === 'Bedroom') stats.bedroom += 1;
      if (item.location === 'Kitchen') stats.kitchen += 1;
      if (item.location === 'Garage') stats.garage += 1;
    });

    setItemStatistics(stats);
  };

  const handleNotificationClose = (id) => {
    removeNotification(id);
  };

  return (
    <div className="dashboard">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
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
        <CalculateItems itemStatistics={itemStatistics} />
        <h2>Locations</h2>
        <div className="locations">
          <div className="location-box">
            <Link to="/location/Living Room">Living Room ({itemStatistics.livingRoom})</Link>
          </div>
          <div className="location-box">
            <Link to="/location/Bedroom">Bedroom ({itemStatistics.bedroom})</Link>
          </div>
          <div className="location-box">
            <Link to="/location/Kitchen">Kitchen ({itemStatistics.kitchen})</Link>
          </div>
          <div className="location-box">
            <Link to="/location/Garage">Garage ({itemStatistics.garage})</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
