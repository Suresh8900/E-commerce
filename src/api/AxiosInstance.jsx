import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigateTo } from '../utilities/navigationHelper';


const axiosInstance = axios.create({
  baseURL: 'http://3.144.131.203/ecommerce-web/public/',
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
