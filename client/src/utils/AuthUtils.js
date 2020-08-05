import jwt_decode from 'jwt-decode';
import ApiClient from '../api/ApiClient';

export function isLoggedIn() {
  const token = localStorage.getItem("jwtToken");
  if (token) return true; // if token exists
  return false; // if token does not exist
}

// decode the user id from the token, header and payload can be decoded, but the signiture cannot be decoded
export function getCurrentUser() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    // Decode token to get user data
    const decoded = jwt_decode(token);
    if (decoded) {
      return {
        id: decoded.id
      };
    }
  } else {
    return undefined;
  }
}

export function updateAuthToken(token) { // token need to be saved to localstorage right after login 
  if (token) {
    ApiClient.defaults.headers.common['Authorization'] = token;
  } else {
    delete ApiClient.defaults.headers.common['Authorization'];
  }
}
