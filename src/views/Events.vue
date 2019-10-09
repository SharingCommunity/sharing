<template>
  <div id="events">
    <b-navbar
      class="shadow mb-4 sticky justify-content-between bg-solid text-white"
    >
      <!-- Should be a 'back arrow' -->
      <!-- <div class="btn bg-none close" @click="close">
        <eva-icon
          name="close-outline"
          fill="white"
          width="30px"
          height="30px"
        ></eva-icon>
      </div> -->
      <h5 class="m-0 text-whtie">Your Events</h5>
    </b-navbar>

    <div class="container-fluid">
      <h5>Showing your latest events</h5>
      <hr />
    </div>
  </div>
</template>
<script>
export default {
  name: "EventsComponent"
};
</script>
<style scoped></style>
