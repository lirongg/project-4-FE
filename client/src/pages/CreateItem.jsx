import React, { useState } from 'react';

const CreateItem = ({ addItem }) => {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new item object
    const newItem = {
      name: itemName,
      location,
      description
    };
    // Pass newItem to parent component (e.g., App) for handling
    addItem(newItem);
    // Reset form fields after submission
    setItemName('');
    setLocation('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default CreateItem;
