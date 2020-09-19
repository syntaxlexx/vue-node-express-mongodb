import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * Application Routes
 */
import { tutorials } from './tutorials'
import { users } from './users'
import { roles } from './roles'

let appRoutes = [
  {
    path: '',
    component: () => import('@/components/layout/full/MainContainer.vue'),
    
    children: [
      {
          path: '/',
          redirect: '/home'
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/components/pages/Home.vue")
      },
      {
        path: "/page-not-found",
        name: "page-not-found",
        component: () => import("@/components/pages/PageNotFound.vue")
      },
    ],
  },
  // Redirect to 404 page, if no match found
  {
    path: '*',
    redirect: '/page-not-found'
  }
];

let routeDefinitions = [];

[tutorials, users, roles]
  .forEach( route => {

    routeDefinitions = routeDefinitions.concat(route);

  });

appRoutes[0].children = appRoutes[0].children.concat(routeDefinitions)

/**
 * Finally export the entire router
 */
export default new Router({
  mode: "history",
  routes: appRoutes,
});