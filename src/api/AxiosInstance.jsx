import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigateTo } from '../utilities/navigationHelper';

const API_ENDPOINT = process.env.REACT_APP_API_URL
console.log(process.env.REACT_APP_API_URL); 

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized! Please log in to continue.');
      console.log('Interceptor caught error:', error.response);
      navigateTo('/signin');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
