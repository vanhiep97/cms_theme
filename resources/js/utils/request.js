import axios from 'axios'
import {getToken, removeToken, removeUser} from "./auth";
import store from "../store/index";
import router from "../router/index"

const service = axios.create({
    baseURL: '/api/',
    timeout: 30000 * 4
})

service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + getToken()
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response.status === 500 || error.response.status === 401) {
            store.commit('SET_TOKEN', null)
            store.commit('SET_USER', null)
            removeToken()
            removeUser()
            router.push({ path: '/admin/login' })
        }
        return Promise.reject(error.response.data)
    }
)

export default service
