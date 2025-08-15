import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://67ef861885e4.ngrok-free.app/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
