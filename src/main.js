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
  render: h => h(App),
  created: function() {
    console.log("Vue App created!");
    // console.log("This => ", this);
    this.$http
      .get("http://localhost:3000/api/user/check-cookie")
      .then(response => {
        if (!response.data.error) {
          if (response.data.sessionExists) {
            window.localStorage.setItem(
              "Sharing",
              JSON.stringify(response.data.session)
            );
          } else {
            window.localStorage.removeItem("Sharing");
            this.$router.push("/auth");
          }
          // console.log("Response => ", response.data);
        } else {
          console.log("Error => ", response.data);
        }
        // self.$set(this, "user", response);
      })
      .catch(err => {
        console.log(err);
        // Router.push("/");
      });
  }
}).$mount("#app");
