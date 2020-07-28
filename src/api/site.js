import request from '@/utils/request'

export function getSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
    })
}