<template>
  <div id="events">
    <b-navbar
      class="shadow mb-4 sticky justify-content-between bg-solid text-white"
    >
      <!-- Should be a 'back arrow' -->
      <div class="btn bg-none close" @click="back">
        <eva-icon
          name="arrow-back-outline"
          fill="white"
          width="30px"
          height="30px"
        ></eva-icon>
      </div>
      <h5 class="m-0 text-whtie">Your Events</h5>
    </b-navbar>

    <div class="container-fluid">
      <h5>Showing your latest events</h5>
      <hr class="mb-4" />

      <div v-for="ev in $store.getters.EVENTS" :key="ev._id">
        <event-component :event="ev"></event-component>
      </div>
    </div>
  </div>
</template>
<script>
import EventComponent from "../components/Event.vue";
export default {
  name: "ViewEventsComponent",
  components: {
    EventComponent
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  mounted() {
    this.$store.dispatch("FETCH_EVENTS");
  }
};
</script>
<style scoped></style>
