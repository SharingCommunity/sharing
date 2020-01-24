<template>
  <div id="home">
    <navbar-component></navbar-component>
    <b-container class="mt-extra" id="view" fluid>
      <b-row>
        <b-col md="9" sm="12">
          <div>
            <header-component></header-component>
          </div>
        </b-col>
        <!-- <b-col>
          <b-alert variant="success" show>Hello Guys!</b-alert>
          <user-component></user-component>
        </b-col> -->
      </b-row>

      <b-row>
        <b-col
          id="main-view"
          class="mb-4"
          md="9"
          sm="12"
          order-md="1"
          order-sm="2"
        >
          <router-view></router-view>
          <alert-component
            :message="alert_message"
            :show="dismissCountdown"
            @count_down_changed="count_down_changed"
            @alert_dismissed="dismissSeconds = 0"
            class="fixed-bottom"
          ></alert-component>
        </b-col>
        <!-- <b-col
          class="sidebar fixed-sidebar d-none"
          id="sidebar-container"
          md="3"
          sm="12"
          order-md="2"
          order-sm="1"
        >
          <sidebar-component></sidebar-component>
        </b-col> -->
      </b-row>
      <fab></fab>
    </b-container>
  </div>
</template>
<script>
import HeaderComponent from "../../components/Header.vue";
import AlertComponent from "../../components/Alert.vue";
import NavbarComponent from "./Navbar.vue";
import fab from "../../components/fab.vue";
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
    HeaderComponent,
    AlertComponent,
    NavbarComponent,
    fab
  },
  methods: {
    show_alert(event, type) {
      switch (type) {
        case "ask":
          this.alert_message = "A new ask was made" + event._id;
          break;
        case "give":
          this.alert_message = "A new gift was made" + event._id;
          break;
        case "chat":
          this.alert_message = "New message on one of your posts";
          break;
      }

      this.dismissCountdown = this.dismissSeconds;
    },
    count_down_changed(seconds) {
      this.dismissCountdown = seconds;
    },
    setSession() {
      if (window.localStorage.getItem("Sharing")) {
        this.$store.dispatch(
          "SET_USER",
          JSON.parse(window.localStorage.getItem("Sharing")).userID
        );
      }
    },
    handleMessage: function(chat) {
      self.show_alert(event, "chat");
      console.log(
        "You have a new message on one of your connected posts",
        chat
      );
      this.$store.dispatch("ADD_CHAT", chat);
    },
    handleNewEvent: function(event) {
      console.log("New Event => ", event);
      this.$store.dispatch("ADD_EVENT", event);
    },
    handleNewPost: function(post) {
      console.log("Inside New Post, Vue Instance =>", this);
      this.$store.dispatch("ADD_POST", post);
      console.log(post);
    },
    removeAllListeners: function() {
      console.log("Removing Listeners");
      this.$socket.removeListener("new_message", this.handleMessage);

      this.$socket.removeListener("EVENT", this.handleNewEvent);

      this.$socket.removeListener("new_post", this.handleNewPost);
    }
  },
  created() {
    console.log("#Home Component Created =>", this);
  },
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

    this.setSession();

    // turn off specific listeners when destroying component...

    this.$socket.on("connect", function() {
      console.log("Connected!");
    });

    // Sockets with named listeners
    this.$socket.on("new_message", this.handleMessage);

    this.$socket.on("EVENT", this.handleNewEvent);

    this.$socket.on("new_post", this.handleNewPost);

    // this.setUsername();

    // this.$store.dispatch("GET_USER");
    this.$store.dispatch("SET_POSTS");
    // this.getUserData();
  },
  beforeDestroy() {
    this.removeAllListeners();
  },
  destroyed() {
    console.log("Home Component Destroyed =>", this);
  }
};
</script>
<style scoped>
.sidebar {
  height: 100vh;
}

.mt-extra {
  margin-top: 4rem !important;
}

.fixed-sidebar {
  position: fixed !important;
  right: 0px !important;
}
/* 
#main-view {
  height: 80vh;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
} */
#main-view {
  /* border-radius: 8px; */
  height: auto;
  /* background-color: #d1ecf1; */
}
</style>
