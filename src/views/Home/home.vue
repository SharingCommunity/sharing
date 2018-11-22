<template>
  <div id="home">
    <b-container id="view" fluid>
      <header-component></header-component>
      <b-row>
        <b-col md="9" sm="12" order-md="1" order-sm="2">
          <router-view></router-view>
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
export default {
  name: "Home",
  data() {
    return {
      msg: "Hi!"
    };
  },
  components: {
    SidebarComponent,
    HeaderComponent
  },
  methods: {
    printMessage(message) {
      this.$socket.emit("message", message);
    },
    commitMessage(message) {
      this.$store.commit("ADD_MESSAGE", message);
      console.log(message);
    }
  },
  mounted() {
    var self = this;
    this.$socket.on("connect", function() {
      console.log("Connected!");
    });
    this.$socket.on("message", function(message) {
      self.$store.dispatch("ADD_MESSAGE", message);
    });
  },
  sockets: {
    connect() {
      console.log("Socket Connected");
    },
    message: function(message) {
      this.$store.commit("ADD_MESSAGE", message);
      console.log(message);
    }
  }
};
</script>
<style src="./home.css">
</style>
