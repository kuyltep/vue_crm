import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/compat/app";
import localeFilter from "@/filters/locale.filter";
const appName = process.env.VUE_APP_TITLE;
const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Home", layout: "main", auth: true },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login", layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { title: "Categories", layout: "main", auth: true },
    component: () => import("@/views/Categories.vue"),
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: { title: "Detail-record", layout: "main", auth: true },
    component: () => import("@/views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { title: "History", layout: "main", auth: true },
    component: () => import("@/views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { title: "Planning", layout: "main", auth: true },
    component: () => import("@/views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { title: "Profile", layout: "main", auth: true },
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { title: "Record", layout: "main", auth: true },
    component: () => import("@/views/Record.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Register", layout: "empty" },
    component: () => import("@/views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${localeFilter(to.meta.title)} | ${appName}`;
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
