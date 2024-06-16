import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export function getItems(id) {
  return sendRequest(`${BASE_URL}/items/`);
}

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

export function getItemsByLocation(location) {
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

export function deleteItem(id) {
  return sendRequest(`${BASE_URL}/items/delete/${id}`, "DELETE");
}

export async function getItemById(itemid) {
  return sendRequest(`${BASE_URL}/items/item/${itemid}`)
    .then((response) => {
      console.log("Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error fetching items by itemid:", error);
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