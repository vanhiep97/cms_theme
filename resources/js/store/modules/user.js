import {loginApi, logoutApi} from '../../api/user.api'
import {setUser, setToken, removeToken, removeUser} from '../../utils/auth'

const user = {
    state: {
        token: null,
        user: null,
        count: 0
    },
    getters: {
        token(state){
            return state.token
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_COUNT: (state) => {
            state.count++
        }
    },
    actions: {
        login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo).then(response => {
                    commit('SET_TOKEN', response.token)
                    setToken(response.token)
                    commit('SET_USER', response.user)
                    setUser(JSON.stringify(response.user))
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                logoutApi().then(response => {
                    removeToken()
                    removeUser()
                    commit('SET_USER', null)
                    commit('SET_TOKEN', null)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
