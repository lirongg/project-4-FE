import React, { useState } from "react";
import { createItem } from "../utilities/users-api";
import { imageUpload } from "../utilities/items-api";

function CreateItem() {
  const [newItem, setNewItem] = useState({
    item: "",
    location: "",
    description: "",
    imageURL: "",
  });

  const [imageFile, setImageFile] = useState(null);

  function handleChange(evt) {
    setNewItem({ ...newItem, [evt.target.name]: evt.target.value });
  }

  function handleImageChange(evt) {
    setImageFile(evt.target.files[0]);
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
      await createItem(newItemWithImage);
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
