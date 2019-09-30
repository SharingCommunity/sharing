<template>
  <div id="home">
    <b-container id="view" fluid>
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
    fab
  },
  methods: {
    show_alert(event, type) {
      this.dismissCountdown = this.dismissSeconds;

      switch (type) {
        case "ask":
          this.alert_message = "A new ask was made" + event._id;
          break;
        case "give":
          this.alert_message = "A new gift was made" + event._id;
          break;
      }
    },
    count_down_changed(seconds) {
      this.dismissCountdown = seconds;
    }
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
<style scoped>
.sidebar {
  height: 100vh;
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
