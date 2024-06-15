import React, { useState, useEffect } from 'react';
import { imageUpload } from '../utilities/items-api';
import { updateItem} from '../utilities/users-api';

const EditItem = ({ itemToEdit, onUpdateItem }) => {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Populate form fields with itemToEdit data when it changes
    if (itemToEdit) {
      setItemName(itemToEdit.item);
      setLocation(itemToEdit.location);
      setDescription(itemToEdit.description);
      setImageURL(itemToEdit.imageURL || ''); // Ensure imageURL is initialized or empty string
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update item object
    const updatedItem = {
      item: itemName,
      location,
      description,
      imageURL: imageURL // Use imageURL to display or store the URL of the uploaded image
    };

    try {
      // Check if a new image file was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        // Upload image to Cloudinary and get the imageURL
        const imageData = await imageUpload(formData);
        updatedItem.imageURL = imageData.url; // Update imageURL with the uploaded image URL
        console.log('Image uploaded successfully:', updatedItem.imageURL);
      }

      // Update item using updateItem function
      const response = await updateItem(itemToEdit._id, updatedItem);
      console.log('Item updated successfully:', response);

      onUpdateItem(response); // Pass the updated item data or handle response accordingly

    } catch (error) {
      console.error('Error updating item:', error);
      // Handle error state or display error message to the user
    }
  };

  const handleImageChange = (evt) => {
    setImageFile(evt.target.files[0]); // Update imageFile state with the selected file
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
