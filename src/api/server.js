import request from '@/utils/request';

export function getServerInfo({ serverId }) {
  return request({
    url: `/server/${serverId}`,
    method: 'get',
  });
}
export function getServers() {
  return request({
    url: '/server',
    method: 'get',
  });
}
export function addServer(data) {
  return request({
    url: '/admin/server',
    method: 'post',
    data,
  });
}
