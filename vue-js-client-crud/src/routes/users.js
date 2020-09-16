const prefix = 'users';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/users/Index")
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/users/Create")
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/users/Show")
  },
];

export const users = routes;