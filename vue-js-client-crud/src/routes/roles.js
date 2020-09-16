const prefix = 'roles';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/roles/Index")
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/roles/Create")
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/roles/Show")
  },
];

export const roles = routes;