// RelocatePage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, relocateItem } from '../utilities/items-api'; // Import necessary functions

function RelocateItem() {
  const { id } = useParams(); // Get the item ID from the route parameters
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [newLocation, setNewLocation] = useState('');
  const [error, setError] = useState(null);

  const locationOptions = ["Living Room", "Bedroom", "Kitchen", "Garage", "Office"];

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getItemById(id);
        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Failed to load item details.');
      }
    };

    fetchItem();
  }, [id]);

  const handleRelocate = async () => {
    if (newLocation) {
      try {
        await relocateItem(id, newLocation);
        navigate('/'); // Navigate back to the main items page after relocation
      } catch (error) {
        console.error('Relocation error:', error);
        setError('Failed to relocate item. Please try again.');
      }
    } else {
      setError('Please select a new location.');
    }
  };

  if (!item) return <div>Loading item details...</div>;

  return (
    <div>
      <h2>Relocate {item.item}</h2>
      <p>Current Location: {item.location}</p>
      <select
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      >
        <option value="">Select New Location</option>
        {locationOptions.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <button onClick={handleRelocate}>Submit</button>
      <button onClick={() => navigate(-1)}>Cancel</button> {/* Go back to the previous page */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RelocateItem;
