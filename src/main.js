import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import moment from "vue-moment";
import VueSocketIo from "vue-socket.io";
import EvaIcons from "vue-eva-icons";
// import socketio from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Axios from "axios";
Vue.use(moment);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(EvaIcons);
// Vue.use(Axios);
// Vue.use(socketio);

Vue.use(
  new VueSocketIo({
    connection: "http://localhost:3000"
  })
);

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
    let userID;
    let sessionID;

    let obj = JSON.parse(window.localStorage.getItem("Sharing"));

    if (obj) {
      userID = obj.userID;
      sessionID = obj.sessionID;
    }

    this.$http
      .post(
        "http://localhost:3000/app/check-cookie",
        { userID, online: navigator.onLine, sessionID },
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (!response.data.error) {
          if (response.data.sessionExists) {
            window.localStorage.setItem(
              "Sharing",
              JSON.stringify({
                userID: response.data.user.userID,
                sessionID: response.data.user.sessionID
              })
            );
          } else {
            window.localStorage.removeItem("Sharing");
            console.log("Erro log =>", response.data.error);
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
