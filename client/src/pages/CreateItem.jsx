import React, { useState } from "react";
import { createItem } from "../utilities/users-api";

function CreateItem() {
  const [newItem, setNewItem] = useState({
    item: "",
    location: "",
    description: "",
  });

  function handleChange(evt) {
    setNewItem({ ...newItem, [evt.target.name]: evt.target.value });
  }

async function handleSubmit(evt) {
  evt.preventDefault();
  try {
    await createItem(newItem);
    alert("Item created!");
    setNewItem({
      item: "",
      location: "",
      description: "",
    });
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
          name="item"
            type="text"
            value={newItem.item}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <select
          name="location"
            value={newItem.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Garage">Garage</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
          name="description"
            value={newItem.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default CreateItem;
