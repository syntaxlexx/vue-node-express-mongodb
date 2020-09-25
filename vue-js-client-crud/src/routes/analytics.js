const prefix = 'analytics';

var routes = [
  {
    path: `/${prefix}`,
    name: `${prefix}-index`,
    component: () => import("@/components/analytics/Index"),
    meta: {
      requiresAuth: true,
      is_admin : true
    }
  },
];

export const analytics = routes;