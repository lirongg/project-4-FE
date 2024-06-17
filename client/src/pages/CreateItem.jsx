import React, { useState, useEffect } from "react";
import { createItem } from "../utilities/users-api";
import { imageUpload, getAllLocations } from "../utilities/items-api";
import { useNotification } from '../components/NotificationContext';

function CreateItem({ user }) {
  const { addNotification } = useNotification();
  const [newItem, setNewItem] = useState({
    item: "",
    location: "",
    description: "",
    imageURL: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  // Fetch locations when the component mounts
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const fetchedLocations = await getAllLocations();
        console.log('Fetched Locations:', fetchedLocations); // Debugging log
        setLocations(fetchedLocations.map(location => {
          console.log('Location Object:', location); // Log each location object
          return location.name || location; // Adjust based on structure
        }));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    loadLocations();
  }, []);

  useEffect(() => {
    console.log('Current Locations State:', locations); // Log the current state of locations
  }, [locations]);

  function handleChange(evt) {
    setNewItem({ ...newItem, [evt.target.name]: evt.target.value });
  }

  function handleImageChange(evt) {
    setImageFile(evt.target.files[0]);
  }

  function handleNewLocationChange(evt) {
    setNewLocation(evt.target.value);
  }

  async function handleAddNewLocation() {
    if (newLocation && !locations.includes(newLocation)) {
      try {
        setLocations([...locations, newLocation]);
        setNewLocation(""); // Clear the input field after adding
      } catch (error) {
        console.error("Error adding new location:", error);
      }
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let imageURL = "";
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const imageData = await imageUpload(formData);
        imageURL = imageData.url;
        console.log('Image uploaded successfully:', imageURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    try {
      const newItemWithImage = { ...newItem, imageURL };
      console.log('Item to be created:', newItemWithImage); // Debug log
      const createdItem = await createItem(newItemWithImage);
      addNotification(
        `${user.name} created item "${createdItem.item}" in "${createdItem.location}"`,
        'item-created'
      );
      console.log('Item added successfully:', newItemWithImage); // Debug log
      alert("Item created!");
      setNewItem({
        item: "",
        location: "",
        description: "",
        imageURL: "",
      });
      setImageFile(null);
    } catch (error) {
      console.log('Error adding item:', error);
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
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </label>
        <div className="add-location">
          <label>
            Add New Location:
            <input
              type="text"
              value={newLocation}
              onChange={handleNewLocationChange}
              placeholder="Enter new location"
            />
          </label>
          <button type="button" onClick={handleAddNewLocation}>
            Add Location
          </button>
        </div>
        <label>
          Description:
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Image:
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default CreateItem;
