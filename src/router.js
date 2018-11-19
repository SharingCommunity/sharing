import Vue from "vue";
import Router from "vue-router";

// Import components and views
import Home from "./views/Home/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{ path: "/", component: Home }]
});
