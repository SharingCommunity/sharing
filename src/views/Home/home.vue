<template>
  <div id="home">
    <b-container id="view" fluid>
      <header-component></header-component>
      <b-row>
        <b-col md="9" sm="12" order-md="1" order-sm="2">
          <router-view></router-view>
          <alert-component
            :message="alert_message"
            :show="dismissCountdown"
            @count_down_changed="count_down_changed"
            @alert_dismissed="dismissSeconds = 0"
            class="fixed-bottom"
          ></alert-component>
        </b-col>
        <b-col class="sidebar" md="3" sm="12" order-md="2" order-sm="1">
          <sidebar-component></sidebar-component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import SidebarComponent from "../../components/Sidebar.vue";
import HeaderComponent from "../../components/Header.vue";
import AlertComponent from "../../components/Alert.vue";
import Axios from "axios";
import Router from "../../router.js";
export default {
  name: "Home",
  data() {
    return {
      msg: "Hi!",
      dismissCountdown: 0,
      dismissSeconds: 5,
      alert_message: "",
      user: {}
    };
  },
  components: {
    SidebarComponent,
    HeaderComponent,
    AlertComponent
  },
  methods: {
    show_alert(event, type) {
      this.dismissCountdown = this.dismissSeconds;

      switch (type) {
        case "request":
          this.alert_message = "A new request was made" + event._id;
          break;
        case "offer":
          this.alert_message = "A new offer was made" + event._id;
          break;
      }
    },
    count_down_changed(seconds) {
      this.dismissCountdown = seconds;
    },
    getUserData() {
      let self = this;
      Axios.get("http://localhost:3000/api/connect")
        .then(response => {
          console.log(response.headers);
          self.$set(this, "user", response);
        })
        .catch(err => {
          console.log(err);
          Router.push("/");
        });
    }
  },
  mounted() {
    let self = this;
    this.$socket.on("connect", function() {
      console.log("Connected!");
    });
    this.$socket.on("post", function(post) {
      self.$store.dispatch("ADD_POST", post);
    });
    this.$socket.on("new_post", function(post) {
      self.$store.dispatch("ADD_NEW_POST", post);
      console.log(post);
    });
    this.$socket.on("new_request", function(event) {
      self.show_alert(event, "request");
      self.$store.dispatch("ADD_EVENT", event);
    });
    this.$socket.on("new_offer", function(event) {
      self.show_alert(event, "offer");
      self.$store.dispatch("ADD_EVENT", event);
    });
    this.$store.dispatch("SET_POSTS");
    // this.getUserData();
  }
};
</script>
<style src="./home.css"></style>
