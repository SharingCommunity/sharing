import Vue from "vue";
import Router from "vue-router";

// Import components and views
import Home from "./views/Home/home.vue";
import Main from "./views/Main/main.vue";
import Auth from "./views/Auth/auth.vue";
import Login from "./views/Auth/login.vue";
import Signup from "./views/Auth/signup.vue";
import ViewPost from "./views/ViewPost.vue";
import ViewEvents from "./views/ViewEvents.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      redirect: "home",
      children: [{ path: "home", name: "Home", component: Main }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/auth",
      component: Auth,
      redirect: "auth/login",
      name: "Auth",
      children: [
        { path: "login", name: "Login", component: Login },
        { path: "join", name: "Signup", component: Signup }
      ],
      meta: {
        guest: true
      }
    },
    {
      path: "/post/:id",
      component: ViewPost,
      name: "Post",
      meta: {
        guest: true
      },
      props: true
    },
    {
      path: "/events",
      component: ViewEvents,
      name: "ViewEvents"
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requiresAuth)) {
//     // if (!router.app.$session.exists()) {
//     //   console.log("NO Session!");
//     //   next({ path: "/auth" });
//     // } else {
//     //   next();
//     // }
//     // Check if sharing object exists in localStorage
//     if (!window.localStorage.getItem("Sharing")) {
//       console.log("NO Session!");
//       next({ path: "/auth" });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(r => r.meta.guest)) {
//     next();
//   } else {
//     next();
//   }
// });

export default router;
