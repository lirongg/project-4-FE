// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CalculateItems from '../../components/CalculateItems';
import { getItems } from '../../utilities/items-api';
import Locations from '../Locations';
import "./Dashboard.css"

function Dashboard({ user, setUser }) {
  const [items, setItems] = useState([]);
  const [itemStatistics, setItemStatistics] = useState({
    total: 0,
    livingRoom: 0,
    bedroom: 0,
    kitchen: 0,
    garage: 0,
  });

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

  return (
    <div>
      <h2>Home Dashboard</h2>
      <div className="dashboard">
        <div className="left-section">
          <Locations statistics={itemStatistics} /> {/* Use the new Locations component */}
        </div>
        <div className="right-section">
          <CalculateItems itemStatistics={itemStatistics} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
