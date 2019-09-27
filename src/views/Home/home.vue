<template>
  <div id="home">
    <b-container id="view" fluid>
      <b-row>
        <b-col md="9">
          <div>
            <header-component></header-component>
          </div>
        </b-col>
        <b-col>
          <!-- <b-alert variant="success" show>Hello Guys!</b-alert> -->
          <user-component></user-component>
        </b-col>
      </b-row>

      <b-row>
        <b-col id="main-view" md="9" sm="12" order-md="1" order-sm="2">
          <router-view></router-view>
          <alert-component
            :message="alert_message"
            :show="dismissCountdown"
            @count_down_changed="count_down_changed"
            @alert_dismissed="dismissSeconds = 0"
            class="fixed-bottom"
          ></alert-component>
        </b-col>
        <b-col
          class="sidebar fixed-sidebar"
          id="sidebar-container"
          md="3"
          sm="12"
          order-md="2"
          order-sm="1"
        >
          <sidebar-component></sidebar-component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import SidebarComponent from "../../components/Sidebar.vue";
import HeaderComponent from "../../components/Header.vue";
import UserComponent from "../../components/User.vue";
import AlertComponent from "../../components/Alert.vue";
// import Axios from "axios";
// import Router from "../../router.js";
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
    UserComponent,
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
    // setUsername() {
    //   const data = JSON.parse(window.localStorage.getItem("Sharing"));
    //   if (data.username) {
    //     this.$store.dispatch("SET_USERNAME", data);
    //   }
    // }
  },
  // computed: {
  //   username: function() {
  //     return (
  //       this.$store.getters.USER.Username ||
  //       JSON.parse(window.localStorage.getItem("Sharing")).username
  //     );
  //   }
  // },
  mounted() {
    // window.onscroll = function(ev) {
    //   const windowScroll = ev.view.document.scrollingElement.scrollTop;
    //   if (
    //     document.getElementById("sidebar-container").scrollTop <= windowScroll
    //   ) {
    //     document
    //       .getElementById("sidebar-container")
    //       .toggleAttribute("class", "fixed-sidebar");
    //   } else {
    //     document
    //       .getElementById("sidebar-container")
    //       .toggleAttribute("class", "fixed-sidebar");
    //   }
    // };

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

    // this.setUsername();

    this.$socket.on("new_request", function(event) {
      self.show_alert(event, "request");
      self.$store.dispatch("ADD_EVENT", event);
    });
    this.$socket.on("new_offer", function(event) {
      self.show_alert(event, "offer");
      self.$store.dispatch("ADD_EVENT", event);
    });
    // this.$store.dispatch("GET_USER");
    this.$store.dispatch("SET_POSTS");
    // this.getUserData();
  }
};
</script>
<style src="./home.css" scoped></style>
