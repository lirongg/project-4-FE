import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { imageUpload } from '../utilities/items-api';
import { updateItem } from '../utilities/users-api';

const EditItem = () => {
  const { itemId } = useParams(); // Extract itemId from URL params

  const [initialState, setInitialState] = useState({});
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Fetch item details using itemId (assuming you have an API to fetch item details by ID)
    const fetchItemDetails = async () => {
      try {
        // Replace this with your API call to fetch item details
        const response = await fetch(`/api/items/${itemId}`); // Example API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        const { item, location, description, imageURL } = data;
        setInitialState({ item, location, description, imageURL });
        setItemName(item || '');
        setLocation(location || '');
        setDescription(description || '');
        setImageURL(imageURL || '');
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemId) {
      console.error('Item ID is missing');
      return;
    }

    const updatedItem = {};

    if (itemName && itemName !== initialState.item) updatedItem.item = itemName;
    if (location && location !== initialState.location) updatedItem.location = location;
    if (description && description !== initialState.description) updatedItem.description = description;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageData = await imageUpload(formData);
        updatedItem.imageURL = imageData.url;
        console.log('Image uploaded successfully:', imageData.url);
      }

      if (Object.keys(updatedItem).length > 0) {
        const response = await updateItem(itemId, updatedItem);
        console.log('Item updated successfully:', response);

        // Handle success, e.g., navigate back to profile page
      } else {
        console.log('No changes detected');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleImageChange = (evt) => {
    setImageFile(evt.target.files[0]);
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
          />
        </label>
        <label>
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          />
        </label>
        <label>
          Upload Image:
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
