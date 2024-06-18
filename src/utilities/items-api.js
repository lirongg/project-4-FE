import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

// CRUD Operations for items

export function getItems() {
  return sendRequest(`${BASE_URL}/items/`);
}

export async function getItemById(itemId) {
  return sendRequest(`${BASE_URL}/items/item/${itemId}`);
}

export async function createItem(userInput) {
  return sendRequest(`${BASE_URL}/items/create`, "POST", userInput);
}

export async function updateItem(itemId, userInput) {
  return sendRequest(`${BASE_URL}/items/update/${itemId}`, "PUT", userInput);
}

export async function deleteItem(itemId) {
  return sendRequest(`${BASE_URL}/items/delete/${itemId}`, "DELETE");
}

// Other item-related operations

export async function searchItems(query) {
  const response = await fetch(`${BASE_URL}/items/search?query=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function imageUpload(formData) {
  try {
    const response = await axios.post(`${BASE_URL}/upload/image`, formData);
    return response.data;
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  }
}

export async function getAllLocations() {
  return sendRequest(`${BASE_URL}/items/locations`)
    .then((response) => {
      console.log("Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error fetching items by location:", error);
      throw error;
    });
}

export async function getItemsByLocation(location) {
  return sendRequest(`${BASE_URL}/items/location/${location}`)
    .then((response) => {
      console.log("Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error fetching items by location:", error);
      throw error;
    });
}

export async function relocateItem(itemId, newLocation) {
  return axios.put(`${BASE_URL}/items/item/relocate`, { itemId, newLocation })
    .then(response => response.data)
    .catch(error => {
      console.error('Error relocating item:', error);
      throw error;
    });
}

export function getUserListing(userId) {
  return sendRequest(`${BASE_URL}/items/${userId}`);
}
