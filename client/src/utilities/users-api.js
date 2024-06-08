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

export function getListing(id){
    return sendRequest(`${BASE_URL}/items/`)
}