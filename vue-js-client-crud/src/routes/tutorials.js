const prefix = 'tutorials';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/tutorials/Index")
  },
  {
    path: `/${prefix}/create`,
    name: `${prefix}-create`,
    component: () => import("@/components/tutorials/Create")
  },
  {
    path: `/${prefix}/:id`,
    name: `${prefix}-show`,
    component: () => import("@/components/tutorials/Show")
  },
];

export const tutorials = routes;