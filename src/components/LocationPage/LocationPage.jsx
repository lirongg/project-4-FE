import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemsByLocation } from '../../utilities/items-api';
import DisplayItems from '../DisplayItems/DisplayItem.jsx';
import DeleteItemButton from '../DeleteItemButton';
import axios from "axios";
import './LocationPage.css'; 

const BASE_URL = "https://project-4-be.onrender.com"; 

function LocationPage() {
  const { location } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchItemsByLocation();
    fetchLocationImage();
  }, [location]);

  const fetchItemsByLocation = async () => {
    try {
      const fetchedItems = await getItemsByLocation(location);
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchLocationImage = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/upload/image/${location}`);
      if (response.data) {
        setImageURL(response.data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching location image:', error);
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('location', location);

      try {
        const response = await axios.post(`${BASE_URL}/upload/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImageURL(response.data.url);
        setUploading(false);
        console.log('Image uploaded and saved successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  const handleDeleteSuccess = (itemId) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  return (
    <div className="location-page">
      <h2>{location} Items</h2>
      <div
        className="upload-section"
        style={{ backgroundImage: imageURL ? `url(${imageURL})` : 'none' }}
      >
        <input type="file" id="file-upload" onChange={handleImageChange} accept="image/*" />
        <label htmlFor="file-upload" className="upload-label">
          Choose File
        </label>
        <button 
          className="upload-button" 
          onClick={handleImageUpload} 
          disabled={uploading || !imageFile}
        >
          {uploading ? 'Uploading...' : 'Upload Background Image'}
        </button>
      </div>

      <div className="items-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="item-container">
              <DisplayItems item={item} />
              <button onClick={() => navigate(`/relocate/${item._id}`)}>
                Relocate Item
              </button>
              <DeleteItemButton
                itemId={item._id}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </div>
          ))
        ) : (
          <p>No items found in this location.</p>
        )}
      </div>
    </div>
  );
}

export default LocationPage;
