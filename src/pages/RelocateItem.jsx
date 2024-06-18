import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, relocateItem, getAllLocations } from '../utilities/items-api';
import { useNotification } from '../components/Notifications/NotificationContext';
import './FormStyles.css'; 

function RelocateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [item, setItem] = useState(null);
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const fetchedLocations = await getAllLocations();
        setLocations(fetchedLocations.map(location => location.name || location));
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to load locations.');
      }
    };

    loadLocations();
  }, []);

  const handleRelocate = async () => {
    if (newLocation) {
      try {
        await relocateItem(id, newLocation);
        addNotification(`Item "${item.item}" relocated to ${newLocation}`);
        navigate('/'); // Navigate back to the main items page after relocation
      } catch (error) {
        console.error('Relocation error:', error);
        setError('Failed to relocate item. Please try again.');
      }
    } else {
      setError('Please select a new location.');
    }
  };

  if (!item) return <div className="form-page">Loading item details...</div>;

  return (
    <div className="form-page">
      <h2>Relocate {item.item}</h2>
      <p>Current Location: {item.location}</p>
      <label>
        Select New Location:
        <select
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        >
          <option value="">Select New Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleRelocate}>Submit</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button> {/* Go back to the previous page */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RelocateItem;
