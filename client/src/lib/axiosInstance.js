import axios from 'axios';
const BASE_URL= import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_BASE_URL}/api`:'/api';
const axiosInstance = axios.create({
  baseURL:BASE_URL
})
export default axiosInstance;