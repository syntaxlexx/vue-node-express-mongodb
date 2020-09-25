const prefix = 'tutorials';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/tutorials/Index"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/tutorials/Create"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/tutorials/Show"),
    meta: {
      requiresAuth: true,
    }
  },
];

export const tutorials = routes;