import axios from 'axios';

const service = axios.create({
  timeout: 26000,
  baseURL: '/api'
});

export default service;
