import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'http://localhost:3000/api';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 10,
});

instance.interceptors.response.use(response => {
  return response
}, error => {
  return error;
});

export const ins = instance;
