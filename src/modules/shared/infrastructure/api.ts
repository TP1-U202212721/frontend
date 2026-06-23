import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://localhost:5018/api/v1', 
  headers: {
    'Content-Type': 'application/json'
  },
  
});

export const apiWithFormData = axios.create({
  baseURL: 'http://localhost:5018/api/v1', 
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  
});



