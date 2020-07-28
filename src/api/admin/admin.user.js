import request from '@/utils/request';

export function getAllUser(params) {
  return request({
    url: '/admin/user',
    method: 'get',
    params,
  });
}
