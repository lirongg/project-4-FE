import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export function signIn(userInput) {
  return sendRequest(`${BASE_URL}/users/sign-in`, "POST", userInput);
}

export function signUp(userInput) {
  return sendRequest(`${BASE_URL}/users/sign-up`, "POST", userInput);
}

export function createItem(userInput) {
  return sendRequest(`${BASE_URL}/items/create`, "POST", userInput);
}

export function getUserListing(id) {
  return sendRequest(`${BASE_URL}/items/${id}`);
}

export async function updateItem(id, userInput) {
  return sendRequest(`${BASE_URL}/items/update/${id}`, "PUT", userInput);
}

export function deleteUser(id) {
  return sendRequest(`${BASE_URL}/users/delete/${id}`, "DELETE");
}

export async function updateUser(userData, isPasswordChange = false) {
  try {
    // Extract the user ID and construct the URL correctly
    const userId = userData._id;
    const url = `${BASE_URL}/users/${userId}`;
    
    const response = await axios.put(url, userData, {
      headers: {
        'Content-Type': 'application/json',
        // Include authorization header if required
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}



