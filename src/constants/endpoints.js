//import path from 'path';
import axios from 'axios';
const apiUrl = 'http://localhost:3000';
export const axiosInstance = axios.create({
  baseURL: apiUrl
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//export const login = path.join(apiUrl, 'login');
export const login = '/login';
