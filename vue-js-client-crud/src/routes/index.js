import Vue from "vue";
import Router from "vue-router";
import Analytics from '@/libs/analytics/Analytics';
const analyticsObj = new Analytics();
import { isAuthenticated, getUserFromStorage } from '@/utils/Customs'

Vue.use(Router);

/**
 * Application Routes
 */
import { auth } from './auth'
import { tutorials } from './tutorials'
import { users } from './users'
import { roles } from './roles'
import { analytics } from './analytics'

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
        component: () => import("@/components/pages/Home.vue"),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: "/starter-page",
        name: "starter-page",
        component: () => import("@/components/pages/StarterPage.vue")
      },
      {
        path: "/page-not-found",
        name: "page-not-found",
        component: () => import("@/components/pages/PageNotFound.vue")
      },
      {
        path: "/not-authorized",
        name: "not-authorized",
        component: () => import("@/components/pages/NotAuthorized.vue")
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

[auth, tutorials, users, roles, analytics]
  .forEach( route => {

    routeDefinitions = routeDefinitions.concat(route);

  });

appRoutes[0].children = appRoutes[0].children.concat(routeDefinitions)

/**
 * Finally export the entire router
 */
const router = new Router({
  mode: "history",
  routes: appRoutes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
});

/**
 * check if user has certain role
 *
 * @param user
 * @param role
 * @returns {boolean}
 */
const userHasRole = (user, role) => {
  let status = false
  user.roles.forEach(it => {
    if (it.name == role) {
      status = true
    }
  })

  return status;
}

/**
 * update title if meta exists
 */
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (! isAuthenticated()) {
      return next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = getUserFromStorage()
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1 || userHasRole(user, 'admin')) {
          // next()
          // allow continuation to set meta title data below
        }
        else {
          return next({ name: 'not-authorized'})
        }
      } else {
        // next()
        // allow continuation to set meta title data below
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(isAuthenticated()) {
      return next({ name: 'home'})
    }
    else {
      // next()
      // allow continuation to set meta title data below
    }
  }

  if(to.hasOwnProperty('meta') && to.meta.hasOwnProperty('title')) {
    document.title = to.meta.title
    $('.breadcrumb-heading').text(to.meta.title)
  }

  analyticsObj.logTrafficFromRouter(to)

  next()
})

export default router;