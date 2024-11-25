import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('pages/TablePage.vue'),
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('pages/FriendsPage.vue'),
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('pages/FormPage.vue'),
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('pages/ListPage.vue'),
      },
      {
        path: 'grid',
        name: 'grid',
        component: () => import('pages/GridPage.vue'),
      },
    ],
  },
  /* ROUTES AVEC UN NOUVEAU LAYOUT */
  {
    path: '/login',
    name: 'auth',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
