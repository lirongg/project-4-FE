import sendRequest from "./send-request";
import axios from "axios";

const BASE_URL = "https://project-4-be.onrender.com";

export function signIn(userInput) {
  return sendRequest(`${BASE_URL}/users/sign-in`, "POST", userInput);
}

export function signUp(userInput) {
  return sendRequest(`${BASE_URL}/users/sign-up`, "POST", userInput);
}

export function deleteUser(id) {
  return sendRequest(`${BASE_URL}/users/delete/${id}`, "DELETE");
}


export async function updateUser(userData, isPasswordChange = false) {
  try {
    const userId = userData._id;
    const url = `${BASE_URL}/users/${userId}`;

    const response = await axios.put(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
