import React, { useEffect, useState } from 'react';
import CalculateItems from '../components/CalculateItems';
import { getListing } from '../utilities/users-api';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [itemStatistics, setItemStatistics] = useState({
    total: 0,
    livingRoom: 0,
    bedroom: 0,
    kitchen: 0,
    garage: 0,
  });

  const fetchItems = async () => {
    try {
      const fetchedItems = await getListing();
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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>All Items</h2>

      <CalculateItems itemStatistics={itemStatistics} />
    </div>
  );
}

export default Dashboard;
