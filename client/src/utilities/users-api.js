import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = 'http://localhost:3001'

export function signIn(userInput) {
    return sendRequest(`${BASE_URL}/users/sign-in`, 'POST', userInput)
}

export function signUp(userInput) {
    return sendRequest(`${BASE_URL}/users/sign-up`, 'POST', userInput)
}

export function createItem(userInput) {
    return sendRequest(`${BASE_URL}/items/create`, 'POST', userInput)
}

export function getUserListing(id){
    return sendRequest(`${BASE_URL}/items/${id}`)
}

export function getItems(id){
    return sendRequest(`${BASE_URL}/items/`)
}

export async function searchItems(query) {
    const response = await fetch(`${BASE_URL}/items/search?query=${query}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
  
export async function imageUpload(formData) {
    try {
      const response = await axios.post(`${BASE_URL}/upload/image`, formData);
      return response.data; // Return the response data from the server
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  }

  export function getItemsByLocation(location) {
    return sendRequest(`${BASE_URL}/items/location/${location}`)
      .then(response => {
        // Assuming response is JSON data or handle response as needed
        console.log('Response:', response);
        return response;
      })
      .catch(error => {
        console.error('Error fetching items by location:', error);
        throw error; // Rethrow error to propagate it further if needed
      });
  }