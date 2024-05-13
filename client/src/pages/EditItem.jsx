import React, { useState, useEffect } from 'react';

const EditItem = ({ itemToEdit, updateItem }) => {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Set initial values for editing existing item
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setLocation(itemToEdit.location);
      setDescription(itemToEdit.description);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update item object
    const updatedItem = {
      id: itemToEdit.id,
      name: itemName,
      location,
      description
    };
    // Pass updatedItem to parent component (e.g., App) for handling
    updateItem(updatedItem);
  };

  return (
    <div>
      <h2>Edit Item</h2>
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
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
