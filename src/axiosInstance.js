import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://246c1defdc74.ngrok-free.app/api/',
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
