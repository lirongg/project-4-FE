import sendRequest from "./send-request";

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

// users-api.js

export async function notifyUser(userId, message) {
  try {
    const response = await fetch(`/api/notify/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error notifying user:', error);
  }
}
