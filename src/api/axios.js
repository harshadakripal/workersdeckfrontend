import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workersdeck-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
