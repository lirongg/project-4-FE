import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import DisplayItems from './DisplayItem';
import { getItemsByLocation } from '../utilities/users-api';


function LocationItems() {
  const { location } = useParams();
  const [items, setItems] = useState([]);

  const fetchItemsByLocation = async () => {
    try {
      const fetchedItems = await getItemsByLocation(location);
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items by location:", error);
    }
  };
  useEffect(() => {
    fetchItemsByLocation();
  }, [location]);

  return (
    <div>
      <h2>Items in {location}</h2>
      {items.map((item) => (
        <div key={item._id}>
          <DisplayItems
            item={item}
            location={item.location}
            description={item.description}
            image={item.image}
          />
        </div>
      ))}
    </div>
  );
}


export default LocationItems;