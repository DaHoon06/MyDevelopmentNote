import axios from "axios";

// axios 인스턴스 생성
const client = axios.create();

/*
client.defaults.baseURL = 'http://localhost:8080/api';
client.defaults.headers.common['Authorization'] = 'Bearer ~~~~~';

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)
*/

export default client;