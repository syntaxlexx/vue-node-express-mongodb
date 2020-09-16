import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * Application Routes
 */
import { tutorials } from './tutorials'
import { users } from './users'
import { roles } from './roles'

let routeDefinitions = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("@/components/Home")
  },
];

[tutorials, users, roles]
  .forEach( route => {

    routeDefinitions = routeDefinitions.concat(route);

  });

/**
 * Finally export the entire router
 */
export default new Router({
  mode: "history",
  routes: routeDefinitions,
});