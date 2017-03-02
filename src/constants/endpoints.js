//import path from 'path';
import axios from 'axios';
const apiUrl = 'http://localhost:3000';
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  validateStatus: (status)=> {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//export const login = path.join(apiUrl, 'login');
export const login = '/login';
