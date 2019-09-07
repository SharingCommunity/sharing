import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import moment from "vue-moment";
import VueSocketIo from "vue-socket-io";
import VueSessions from "vue-session";
import VueCookies from "vue-cookies";
// import socketio from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Axios from "axios";
Vue.use(moment);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueCookies);
// Vue.use(Axios);
// Vue.use(socketio);

Vue.use(VueSocketIo, "http://localhost:3000");
Vue.use(VueSessions, { key: "connect.sid" });

// Axios binding

Vue.prototype.$http = Axios;
Vue.prototype.axios = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
