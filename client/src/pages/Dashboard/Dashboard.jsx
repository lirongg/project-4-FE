import React, { useEffect, useState } from 'react';
import { getItems, getAllLocations } from '../../utilities/items-api';
import Locations from '../Locations';
import CalculateItem from '../../components/CalculateItems';
import Notifications from '../../components/Notifications';
import { useNotification } from '../../components/NotificationContext';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const { notifications } = useNotification(); 
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [itemStatistics, setItemStatistics] = useState({ total: 0 });

  useEffect(() => {
    fetchItems();
    fetchLocations();
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

  const fetchLocations = async () => {
    try {
      const fetchedLocations = await getAllLocations();
      setLocations(fetchedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const calculateStatistics = (items) => {
    const stats = { total: items.length };

    items.forEach((item) => {
      const locationKey = item.location.toLowerCase().replace(/\s+/g, '');
      if (!stats[locationKey]) {
        stats[locationKey] = 0;
      }
      stats[locationKey] += 1;
    });

    setItemStatistics(stats);
  };

  return (
    <div>
      <h2>Home Dashboard</h2>
      <div className="dashboard">
        <div className="left-section">
        <h2>📍Locations</h2>
          <Locations statistics={itemStatistics} locations={locations} />
        </div>
        <div className="right-section">
          <div className="notifications-container">
            <h2>Notifications ({notifications.length})</h2>
            <Notifications />
          </div>
          <div className="item-statistics-container">
          <h2>Item Statistics</h2>
            <CalculateItem itemStatistics={itemStatistics} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
