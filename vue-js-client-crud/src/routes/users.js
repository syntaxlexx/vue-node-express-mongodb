const prefix = 'users';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/users/Index"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/users/Create"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/users/Show"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
];

export const users = routes;