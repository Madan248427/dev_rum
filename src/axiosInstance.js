import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://drf-1-p3vn.onrender.com/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
