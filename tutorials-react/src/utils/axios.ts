import axios, { AxiosInstance, AxiosResponse } from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api'

const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 20000
});

instance.interceptors.request.use(config => {
    console.log('AXIOS 요청');
    return config
});

instance.interceptors.response.use(res => {
    const { data } = res;
    const { result, error } = data;
    return res;
}, error => {
    const { res } = error;
    const{ status, data } = res;

    if(status === 401) {
        console.log('401 ERROR');
    } else {
        console.log(`ERROR : ${error}`);
    }
    return res;
});
export const axiosInstance = instance;