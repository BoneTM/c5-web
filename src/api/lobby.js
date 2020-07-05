import request from '@/utils/request';

export function joinLobby({ lobbyId }) {
  return request({
    url: `/lobby/${lobbyId}/player`,
    method: 'post',
  });
}

export function getLobbyInfo({ lobbyId }) {
  return request({
    url: `/lobby/${lobbyId}`,
    method: 'get',
  });
}
