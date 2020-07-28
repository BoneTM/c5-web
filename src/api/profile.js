import request from '@/utils/request';

export function getProfile({ steam }) {
  return request({
    url: `/profile/${steam}`,
    method: 'get',
  });
}
export function getProfileMatch({ steam }) {
  return request({
    url: `/profile/${steam}/match`,
    method: 'get',
  });
}
