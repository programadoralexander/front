import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Admin from './views/Admin.vue';
import AddUser from './views/AddUser.vue'; // Crea este componente para agregar usuarios
import EditUser from './views/EditUser.vue'; // Crea este componente para editar usuarios
import Registros from './views/Registros.vue';
import ListaMujer from './views/ListaMujer.vue';
import PanelMujer from './views/PanelMujer.vue';
import AddMujer from './views/AddMujer.vue';

import ListaNinos from './views/ListaNinos.vue';
import AddNinos from './views/AddNinos.vue';
import PanelNinos from './views/PanelNinos.vue';

import Prueba from './views/Prueba.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/prueba',
      component: Prueba
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMINISTRADOR' }

    },
    {
      path: '/admin/add',
      name: 'add-user',
      component: AddUser,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMINISTRADOR' }
    },
    {
      path: '/admin/edit/:userId',
      name: 'edit-user',
      component: EditUser,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMINISTRADOR' }
    },
    {
      path: '/registros',
      name: 'registros',
      component: Registros,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/lista/mujer',
      name: 'ListaMujeres',
      component: ListaMujer,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/mujer/add',
      name: 'AddMujer',
      component: AddMujer,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/mujer/:mujerId',
      name: 'mujer',
      component: PanelMujer,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/lista/ninos',
      name: 'ListaNinos',
      component: ListaNinos,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/ninos/add',
      name: 'AddNinos',
      component: AddNinos,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
    {
      path: '/ninos/:ninoId',
      name: 'ninos',
      component: PanelNinos,
      meta: { requiresAuth: true, requiresRoles: ['ROLE_ADMINISTRADOR', 'ROLE_SUPERVISOR','ROLE_BRIGADA'] }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else if (
    to.matched.some(record => record.meta.requiresRoles) &&
    (!loggedIn || !checkRoles(JSON.parse(loggedIn).roles, to.meta.requiresRoles))
  ) {
    next('/');
  } else {
    next();
  }
});

function checkRoles(userRoles, requiredRoles) {
  return userRoles.some(role => requiredRoles.includes(role));
}

export default router;