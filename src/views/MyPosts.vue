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
      <h5 class="m-0 text-whtie">Your Posts</h5>
    </b-navbar>

    <div class="container-fluid">
      <h5>Showing all your posts <span>15 Posts</span></h5>
      <hr class="mb-4" />
      <div v-for="ev in $store.getters.EVENTS" :key="ev._id">
        <event-component
          @view-event="handleEvent(ev)"
          :event="ev"
        ></event-component>
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
    },
    handleEvent(event) {
      if (event.type == 2 || event.type == 1) {
        this.$router.push({ name: "Post", params: { id: event.post } });
      }
    }
  },
  mounted() {
    this.$store.dispatch("FETCH_EVENTS");
  }
};
</script>
<style scoped>
.close {
  padding: 0.3rem;
  border-radius: 0.3rem;
  background-color: rgba(000, 000, 000, 0) !important;
  transition: background-color 0.2s ease-out;
}
.close:active {
  background-color: rgba(000, 000, 000, 0.4) !important;
}
</style>
