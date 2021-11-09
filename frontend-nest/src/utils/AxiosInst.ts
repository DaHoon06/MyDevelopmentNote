import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Vue from 'vue';
import Vuex from '../store';
import router from '@/router/index'
const vm = new Vue();
//const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'https://back.ap.ngrok.io/api'
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api'

const instance :AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 20000
})

instance.interceptors.request.use(config  => {
    if (Vue.$cookies) {
        const token = Vuex.getters.getAccessToken;
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

instance.interceptors.response.use(response => {
    const {data} = response
    const {result, error} = data
    /*if (!result) {
        Vue.$toast.open({
            message: error,
            type: 'error',
            duration: 5000
        });
    }*/
    //console.log(response)
    return response
}, error => {
    const {response} = error
    const {status, data} = response

    if (status === 401) {
        Vue.$toast.open({
            message: data.message,
            type: 'error',
            duration: 5000
        });
        return router.replace({path: "/"}).catch(() => ({}))
    } else {

        Vue.$toast.open({
            message: data.message,
            type: 'error',
            duration: 5000
        });
    }
    return response
});

export const ins = instance