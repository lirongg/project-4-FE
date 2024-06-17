import React, { useEffect, useState } from 'react';
import { getItems, getAllLocations } from '../../utilities/items-api';
import Locations from '../Locations';
import CalculateItem from '../../components/CalculateItems'; // Correct import name
import Notifications from '../../components/Notifications';
import { useNotification } from '../../components/NotificationContext';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const { notifications } = useNotification(); 
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]); // State for locations
  const [itemStatistics, setItemStatistics] = useState({ total: 0 });

  useEffect(() => {
    fetchItems();
    fetchLocations(); // Fetch unique locations
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
      setLocations(fetchedLocations); // Set locations state with the fetched locations
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
          <Locations statistics={itemStatistics} locations={locations} /> {/* Pass locations to the Locations component */}
        </div>
        <div className="right-section">
          <h2>Notifications ({notifications.length})</h2> 
          <Notifications /> 
          <CalculateItem itemStatistics={itemStatistics} /> {/* Corrected component name */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
