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
          <transition>
            <router-view></router-view>
          </transition>
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
  sockets: {
    event: function(data) {
      console.log("New Event => ", data);
      this.$store.dispatch("ADD_EVENT", data);
    },
    connect: function() {
      console.log("Socket Connected!");
    },
    new_post: function(post) {
      this.$store.dispatch("ADD_POST", post);
      console.log("New Post!");
    },
    new_event: function(event) {
      this.makeToast(false, event.message, event.prompt);
      this.$store.dispatch("NEW_EVENT", event);
    },
    post_completed: function(event) {
      console.log("Post completed!");
      this.makeToast(false, event.message, "Post Completed");
    },
    new_chat: function(chat) {
      this.$store.dispatch("ADD_CHAT", chat);
    }
  },
  methods: {
    makeToast(append = false, message, title) {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        solid: true,
        appendToast: append,
        variant: "success"
      });
    },
    count_down_changed(seconds) {
      this.dismissCountdown = seconds;
    },
    setSession() {
      if (window.localStorage.getItem("Sharing")) {
        this.$store.dispatch(
          "SET_USER_ID",
          JSON.parse(window.localStorage.getItem("Sharing")).userID
        );
      }
    }
  },
  created() {
    console.log("Home Component Created =>", this);
  },
  mounted() {
    this.setSession();

    this.$store.dispatch("FETCH_USER");

    this.$store.dispatch("SET_POSTS");
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
.page-enter-active,
.page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
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

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
