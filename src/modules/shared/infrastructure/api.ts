
import axios from 'axios';
import Cookies from 'js-cookie';
export const api = axios.create({
  baseURL: "http://localhost:5018/api/v1",
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/json'
  },
  
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const apiWithFormData = axios.create({
  baseURL: "http://localhost:5018/api/v1",
  validateStatus: () => true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${Cookies.get('token') || ''}`,
  },
  
});


apiWithFormData.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});



