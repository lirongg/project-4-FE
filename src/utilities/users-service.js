import * as usersAPI from './users-api';

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
}

function isValidToken(token) {
    if (typeof token !== 'string') return false;
    const parts = token.split('.');
    if (parts.length !==3) {
        return false
    }
    try{
        const decoded =atob(parts[1])
        return true
    }
    catch (error) {
        console.log(error);
        return false
    }
}

export function getToken() {
    const token=localStorage.getItem('token');
    if(!token || !isValidToken(token)) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() /1000){
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    return token ?
    JSON.parse(atob(token.split('.')[1])).user
    :
    null;
}

export function logOut() {
    localStorage.removeItem('token');
}

export async function signIn(credentials) {
        console.log('Starting sign-in process...');
        const {email, password} = credentials;
    const token = await usersAPI.signIn({email,password});
    console.log('Sign-in successful. Received token:', token);
    localStorage.setItem('token', token);
    console.log('Token saved to localstorage');

    const tokenFromLs = localStorage.getItem('token');
    if (!tokenFromLs || !isValidToken(tokenFromLs)){
      return null;
    } 
    const payload = JSON.parse(atob(tokenFromLs.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    if (tokenFromLs==null){
      return null
    }
    const user = JSON.parse(atob(token.split('.')[1])).user
  
    return user;
}