<template>
  <div id="event" class="event my-2" @click="$emit('view-event')">
    <h5 v-if="event.type === 1">
      One of your posts has been updated
    </h5>

    <!--  -->
    <p>{{ event.message }}</p>

    <h5 v-if="event.type === 2">
      New message on a post you are involved in
    </h5>
  </div>
</template>
<script>
export default {
  name: "EventComponent",
  props: ["event"]
};
</script>
<style scoped>
.event {
  /* background-color: #d1ecf1; */
  background-color: #bee5eb;
  overflow: auto;
  border-radius: 8px !important;
  /* height: 100px; */
  /* max-height: 130px; */
  max-width: 100%;
  border: 3px solid #bee5eb;
  cursor: pointer;
  transition: border 0.2s ease-out;
}
</style>
