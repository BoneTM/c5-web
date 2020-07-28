import request from '@/utils/request';

export function getCodes() {
  return request({
    url: '/admin/vipcode',
    method: 'get',
  });
}

export function createCode(data) {
  return request({
    url: '/admin/vipcode',
    method: 'post',
    data,
  });
}
