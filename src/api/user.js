import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/token',
        method: 'post',
        data
    })
}

export function getInfo(params) {
    return request({
        url: '/user/info',
        method: 'get',
        params
    })
}
export function register(data) {
    return request({
        url: '/user',
        method: 'post',
        data
    })
}