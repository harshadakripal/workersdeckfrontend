import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workersdeckbackend-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials in requests
});

export default axiosInstance;
