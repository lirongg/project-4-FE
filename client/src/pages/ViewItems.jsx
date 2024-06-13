import React, { useEffect, useState } from "react";
import DisplayItems from "../components/DisplayItem";
import { getItems } from "../utilities/users-api";
import Search from "../components/SearchItem";

function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div>
      <h2>All Items</h2>
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
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ViewItems;
