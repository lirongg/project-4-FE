import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem } from '../utilities/users-api';
import { getItemById, imageUpload, getAllLocations } from '../utilities/items-api';
import { useNotification } from '../components/NotificationContext';
import './FormStyles.css'; // Import the CSS file

const EditItem = ({ user }) => {
  const { itemId } = useParams();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [initialState, setInitialState] = useState({});
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const item = await getItemById(itemId);
        if (item) {
          const { item: fetchedItem, location, description, imageURL } = item;
          setInitialState({ item: fetchedItem, location, description, imageURL });
          setItemName(fetchedItem || '');
          setLocation(location || '');
          setDescription(description || '');
          setImageURL(imageURL || '');
        } else {
          throw new Error('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const fetchedLocations = await getAllLocations();
        setLocations(fetchedLocations.map(location => location.name || location));
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    loadLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }

      if (Object.keys(updatedItem).length > 0) {
        await updateItem(itemId, updatedItem);
        addNotification(`Item "${initialState.item}" updated by ${user.name}`);
        navigate('/'); // Navigate back to dashboard or profile
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleImageChange = (evt) => {
    setImageFile(evt.target.files[0]);
  };

  return (
    <div className="form-page">
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
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
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
