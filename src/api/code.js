import request from '@/utils/request';

export function getCodes() {
  return request({
    url: '/admin/code',
    method: 'get',
  });
}

export function createCode(data) {
  return request({
    url: '/admin/code',
    method: 'post',
    data,
  });
}

export function useCode(data) {
  return request({
    url: '/code',
    method: 'put',
    data,
  });
}
