import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {trackRouter} from "vue-gtag-next";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/all-alerts",
    name: "AllAlerts",
    component: () => import(/* webpackChunkName: "AllAlerts" */ "@/views/all-alerts/AllAlerts.vue")
  },
  {
    path: "/change-log",
    name: "Changelog",
    component: () => import(/* webpackChunkName: "Changelog" */ "@/views/Changelog.vue")
  },
  {
    path: "/alert/:instanceId",
    name: "Alert",
    component: () => import(/* webpackChunkName: "Alert" */ "@/views/alert/Alert.vue"),
    props: true
  },
  {
    // Serve 404s on unknown routes
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: () => import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

trackRouter(router);

export default router;
