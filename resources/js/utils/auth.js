import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserKey = 'Admin-User'

export function getToken() {
    return Cookies.get(TokenKey) || null
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function setUser(user) {
    return localStorage.setItem(UserKey, user)
}

export function getUser() {
    return localStorage.getItem(UserKey) || null
}

export function removeUser() {
    return localStorage.removeItem(UserKey)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
