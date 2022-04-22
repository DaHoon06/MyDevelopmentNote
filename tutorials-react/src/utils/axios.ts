import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 12000
})

instance.interceptors.request.use(config => {

  return config
})

instance.interceptors.response.use(response => {
  
  return response
}, error => {
  const { response } = error;
  return response;
})

export default instance
