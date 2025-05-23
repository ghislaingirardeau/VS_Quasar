import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/tuto',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'homeTuto',
        component: () => import('pages/tutos/IndexPage.vue'),
      },
      {
        path: 'table',
        name: 'table',
        component: () => import('pages/tutos/TablePage.vue'),
      },
      {
        path: 'friends',
        name: 'friends',
        component: () => import('pages/tutos/FriendsPage.vue'),
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('pages/tutos/FormPage.vue'),
      },
      {
        path: 'form-creation',
        name: 'formCreation',
        component: () => import('pages/tutos/FormCreationPage.vue'),
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('pages/tutos/ListPage.vue'),
      },
      {
        path: 'grid',
        name: 'grid',
        component: () => import('pages/tutos/GridPage.vue'),
      },
      {
        path: 'random',
        name: 'random',
        component: () => import('pages/tutos/RandomComponentPage.vue'),
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
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: 'Shop Tools',
          // transition: 'slide-right',
        },
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'shopping',
        name: 'shopping',
        meta: {
          title: 'Liste de course',
          // transition: 'slide-left',
        },
        component: () => import('pages/ShoppingPage.vue'),
      },
      {
        path: 'wallet',
        name: 'wallet',
        meta: {
          title: 'Carte Fidelité',
          // transition: 'slide-left',
        },
        component: () => import('pages/WalletPage.vue'),
      },
      {
        path: 'wallet/:id',
        name: 'wallet-id',
        component: () => import('pages/wallet/WalletFullscreenPage.vue'),
        props: (route) => ({ id: route.params.id }),
      },
      {
        path: 'lists',
        name: 'lists',
        meta: {
          title: 'Listes',
          // transition: 'slide-left',
        },
        component: () => import('pages/lists/ListsPage.vue'),
      },
      {
        path: 'list/:id',
        name: 'list-id',
        component: () => import('pages/lists/IdPage.vue'),
        props: (route) => ({ id: route.params.id }),
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
