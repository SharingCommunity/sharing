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
            @alert_dismissed="dismissSeconds=0"
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
export default {
  name: "Home",
  data() {
    return {
      msg: "Hi!",
      dismissCountdown: 0,
      dismissSeconds: 5,
      alert_message: ""
    };
  },
  components: {
    SidebarComponent,
    HeaderComponent,
    AlertComponent
  },
  methods: {
    show_alert(con) {
      (this.dismissCountdown = this.dismissSeconds),
        (this.alert_message = "A new connection was made! " + con._id);
    },
    count_down_changed(seconds) {
      this.dismissCountdown = seconds;
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
    this.$socket.on("new_connection", function(con) {
      self.show_alert(con);
      // self.$store.dispatch("ADD_CONNECTION", con);
    });
    this.$store.dispatch("SET_POSTS");
  }
};
</script>
<style src="./home.css">
</style>
