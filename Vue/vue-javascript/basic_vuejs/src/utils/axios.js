import axios from 'axios'
import App from '../main'
import Store from './vuex'
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/api'
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 500000
})

instance.interceptors.request.use(config => {
    const { token } = Store.getters
    if (token) config.headers['Authorization'] = token
    return config
})

instance.interceptors.response.use(response => {
    /*
    const { data } = response

    if (data.constructor !== ArrayBuffer) {
        const { result, error } = data

        if (!result) {
            App.$bvToast.toast(`${error}`, {
                title: '오류',
                variant : 'danger'
            })
        }
    }
    */
    return response
}, error => {
    const { response, message } = error
    const { status, data } = response || {}
    if (status === 401) {
        App.$bvToast.toast(data.error, {
            title: '오류',
            variant : 'danger'
        })
    } else  {
        App.$bvToast.toast(message, {
            title: '오류',
            variant : 'danger'
        })
    }
    return error

});

export const ins = instance
