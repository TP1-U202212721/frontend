
import axios from 'axios';
import Cookies from 'js-cookie';

// NEXT_PUBLIC_* se inyecta en tiempo de build, por lo que en Coolify debe
// estar marcada como build variable. El fallback mantiene el flujo local
// contra el backend corriendo con dotnet run.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5018/api/v1';
export const api = axios.create({
  baseURL: API_BASE_URL,
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
  baseURL: API_BASE_URL,
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



