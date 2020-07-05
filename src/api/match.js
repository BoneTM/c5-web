import request from '@/utils/request';

export function getMatches() {
  return request({
    url: '/match',
    method: 'get',
  });
}

export function getMatchDetail({ matchId }) {
  return request({
    url: `/match/${matchId}`,
    method: 'get',
  });
}
