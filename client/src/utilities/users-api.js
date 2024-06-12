import sendRequest from "./send-request";

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
  