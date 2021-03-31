import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
// import qs from "qs";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/ali",
    name: "Ali",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ali" */ "@/views/Ali.vue")
  },
  {
    path: "/mohammad",
    name: "mohammad",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mohammad" */ "@/views/Mohammad.vue")
  },
  {
    path: "/zia",
    name: "zia",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Zia.vue")
  },
  {
    path: "/button",
    name: "button",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Button.vue")
  },
  {
    path: "/alert",
    name: "alert",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Alert.vue")
  },
  {
    path: "/textinput",
    name: "textinput",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/TextInput.vue")
  },
  {
    path: "/badge",
    name: "badge",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Badge.vue")
  },
  {
    path: "/menu",
    name: "menu",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Menu.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
// // @ts-ignore
//   parseQuery(query) {
//     return qs.parse(query);
//   },
//   stringifyQuery(query) {
//     const result = qs.stringify(query);
//
//     return result ? "?" + result : "";
//   },
  routes
});

export default router;
