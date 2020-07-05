import Stomp from 'stompjs';
import store from '@/store';
import { getToken } from './auth';

const stompClient = Stomp.client('ws://localhost:9999/ws');
const headers = {};
if (store.getters.token) {
  // let each request carry token
  // ['X-Token'] is a custom headers key
  // please modify it according to the actual situation
  headers['Authorization'] = getToken();
}
stompClient.connect(
  headers,
  (frame) => {
    stompClient.subscribe('/topic/response', (msg) => {
      console.log(msg.body);
    });
  },
  (err) => {
    console.log(err);
  }
);

export default stompClient;
