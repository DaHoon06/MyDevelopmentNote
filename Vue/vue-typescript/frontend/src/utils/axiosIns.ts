import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Vue from 'vue';
import Vuex from '../store';
import router from '@/router'
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

    return response
}, error => {
    const {response} = error
    const {status, data} = response

    if (status === 401) {
        console.log('error시 401에러')
    } else {
        console.log('error시 모르는 에러')
    }
    return response
});

export const ins = instance