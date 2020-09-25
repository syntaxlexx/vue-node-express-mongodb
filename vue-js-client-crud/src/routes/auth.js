var routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/pages/Login.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/pages/Register.vue"),
    meta: {
      guest: true
    }
  },

];

export const auth = routes;