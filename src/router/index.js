import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Index'),
      },
    ],
  },
  {
    path: '/lobby',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: ':lobbyId',
        name: 'Lobby',
        component: () => import('@/views/Lobby'),
      },
    ],
  },
  {
    path: '/code',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Code',
        component: () => import('@/views/Code'),
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: ':steam',
        name: 'Profile',
        component: () => import('@/views/Profile'),
      },
    ],
  },
  {
    path: '/match',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Match',
        component: () => import('@/views/Match'),
      },
      {
        path: ':matchId',
        name: 'MatchDetail',
        component: () => import('@/views/MatchDetail'),
      },
    ],
  },
  {
    path: '/admin/user',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AdminUser',
        component: () => import('@/views/admin/User'),
      },
    ],
  },
  {
    path: '/admin/server',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AdminServer',
        component: () => import('@/views/admin/Server'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
