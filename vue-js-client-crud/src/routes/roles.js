const prefix = 'roles';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/roles/Index"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/roles/Create"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/roles/Show"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
];

export const roles = routes;