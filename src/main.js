import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import moment from "vue-moment";
import VueSocketIo from "vue-socket-io";
// import socketio from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(moment);
Vue.use(BootstrapVue);
// Vue.use(socketio);

Vue.use(VueSocketIo, "http://localhost:3000");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
