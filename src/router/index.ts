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
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/TextInput.vue")
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
  },
  {
    path: "/modal",
    name: "modal",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Modal.vue")
  },
  {
    path: "/dropdown",
    name: "dropdown",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Dropdown.vue")
  },
  {
    path: "/breadcrumb",
    name: "breadcrumb",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Breadcrumb.vue")
  },
  {
    path: "/carousel",
    name: "carousel",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Carousel.vue")
  },
  {
    path: "/slider",
    name: "slider",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Slider.vue")
  },
  {
    path: "/rating",
    name: "rating",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Rating.vue")
  },
  {
    path: "/card",
    name: "card",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Card.vue")
  },
  {
    path: "/tab",
    name: "tab",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Tab.vue")
  },
  {
    path: "/accordion",
    name: "accordion",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Accordion.vue")
  },
  {
    path: "/stepper",
    name: "stepper",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Stepper.vue")
  },
  {
    path: "/timeline",
    name: "timeline",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Timeline.vue")
  },
  {
    path: "/fade",
    name: "fade",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Fade.vue")
  },
  {
    path: "/tooltip",
    name: "tooltip",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Tooltip.vue")
  },
  {
    path: "/progressbar",
    name: "progressbar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/ProgressBar.vue")
  },
  {
    path: "/numberpicker",
    name: "numberpicker",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/NumberPicker.vue")
  },
  {
    path: "/drawer",
    name: "drawer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Drawer.vue")
  },
  {
    path: "/bottomsheet",
    name: "bottomsheet",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/BottomSheet.vue")
  },
  {
    path: "/switch",
    name: "switch",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Switch.vue")
  },
  {
    path: "/checkbox",
    name: "checkbox",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Checkbox.vue")
  },
  {
    path: "/skeleton",
    name: "skeleton",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Skeleton.vue")
  },
  {
    path: "/loading",
    name: "loading",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Loading.vue")
  },
  {
    path: "/timer",
    name: "timer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Timer.vue")
  },
  {
    path: "/rangeSlider",
    name: "rangeSlider",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/RangeSlider.vue")
  },
  {
    path: "/toast",
    name: "toast",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Toast.vue")
  },
  {
    path: "/radio",
    name: "radio",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Radio.vue")
  },
  {
    path: "/animate",
    name: "animate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Animate.vue")
  },
  {
    path: "/table",
    name: "table",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Table.vue")
  },
  {
    path: "/pagination",
    name: "pagination",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Pagination.vue")
  },
  {
    path: "/searchable",
    name: "searchable",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/Searchable.vue")
  },
  {
    path: "/numberTransformer",
    name: "numberTransformer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "zia" */ "@/views/NumberTransformer.vue")
  },
  {
    path: "/zoom",
    name: "zoom",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Zoom.vue")
  },
  {
    path: "/image",
    name: "image",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "zia" */ "@/views/Image.vue")
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
