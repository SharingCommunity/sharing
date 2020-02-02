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
import UserPosts from "./views/UserPosts.vue";
import About from "./views/help/about.vue";

Vue.use(Router);

// const host = window.location.host;
// const parts = host.split('.');
// const domainLength = 3; // route1.example.com => domain length = 3

// const router = () => {
//   let routes;
//   if (parts.length === (domainLength - 1) || parts[0] === 'www') {
//     routes = index;
//   } else if (parts[0] === 'route1') {
//     routes = route1;
//   } else if (parts[0] === 'route2') {
//     routes = route2;
//   } else {
//     // If you want to do something else just comment the line below
//     routes = index;
//   }
//   return routes;
// };

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
    },
    {
      path: "/posts",
      component: UserPosts,
      name: "UserPosts"
    },
    {
      path: "/help/about",
      component: About,
      name: "About",
      meta: {
        guest: true
      }
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
