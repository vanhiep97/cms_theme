import request from '../utils/request';


export function loginApi(data) {
    return request({
        url: 'admin/login',
        method: 'post',
        data
    })
}

export function getUsersApi(optionPage = 10, page) {
    return request({
        url: `admin/users?option=${optionPage}&&page=${page}`,
        method: 'get',
    })
}

export function getUsersTrashApi(optionPage = 10, page) {
    return request({
        url: `admin/users/trashed?option=${optionPage}&&page=${page}`,
        method: 'get',
    })
}

export function logoutApi() {
    return request({
        url: `admin/logout`,
        method: 'post'
    })
}

export function deleteUserApi(id) {
    return request({
        url: `admin/users/${id}`,
        method: 'delete'
    })
}

export function deleteUserTrashApi(id) {
    return request({
        url: `admin/users/${id}/trashed`,
        method: 'delete'
    })
}

export function updateUserStatusApi(id, data) {
    return request({
        url: `admin/users/${id}/change-status`,
        method: 'post',
        data
    })
}

export function restoreUserApi(id) {
    return request({
        url: `admin/users/${id}/restore`,
        method: 'post'
    })
}

export function searchUserApi(optionPage = 10, page, name, email) {
    return request({
        url: `admin/users/search?option=${optionPage}&&page=${page}&&name=${name}&&email=${email}`,
        method: 'get'
    })
}

export function searchUserTrashedApi(optionPage = 10, page, name, email) {
    return request({
        url: `admin/users/search/trashed?option=${optionPage}&&page=${page}&&name=${name}&&email=${email}`,
        method: 'get'
    })
}

export function createUsersApi(data) {
    return request({
        url: `register`,
        method: 'post',
        data
    })
}
