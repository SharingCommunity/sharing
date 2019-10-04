import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import moment from "vue-moment";
import VueSocketIo from "vue-socket-io";
import VueCookies from "vue-cookies";
import EvaIcons from "vue-eva-icons";
// import socketio from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Axios from "axios";
Vue.use(moment);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(EvaIcons);
// Vue.use(Axios);
// Vue.use(socketio);

Vue.use(VueSocketIo, "http://10.3.44.75:3000");
// Vue.use(VueSessions, { key: "connect.sid" });

// Axios binding

Vue.prototype.$http = Axios;
Vue.prototype.axios = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    console.log("Vue App created!", navigator.platform);
    // console.log("This => ", this);

    const session = JSON.parse(window.localStorage.getItem("Sharing"));

    this.$http
      .post(
        "http://10.3.44.75:3000/app/check-cookie",
        { user: "random user", online: navigator.onLine, session },
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (!response.data.error) {
          if (response.data.sessionExists) {
            window.localStorage.setItem(
              "Sharing",
              JSON.stringify(response.data.session)
            );
          } else {
            window.localStorage.removeItem("Sharing");
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
