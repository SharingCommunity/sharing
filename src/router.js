import Vue from "vue";
import Router from "vue-router";

// Import components and views
import Home from "./views/Home/home.vue";
import Main from "./views/Main/main.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      redirect: "main",
      children: [{ path: "main", name: "main", component: Main }]
    }
  ]
});
