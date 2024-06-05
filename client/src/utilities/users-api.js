import sendRequest from "./send-request";

const BASE_URL = 'http://localhost:3001/users'

export function signIn(userInput) {
    return sendRequest(`${BASE_URL}/sign-in`, 'POST', userInput)
}

export function signUp(userInput) {
    return sendRequest(`${BASE_URL}/sign-up`, 'POST', userInput)
}