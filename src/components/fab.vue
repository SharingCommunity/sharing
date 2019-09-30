<template>
  <div>
    <button class="fab" v-b-modal.postmodal>
      <!-- <i data-eva="github" data-eva-fill="#000000" data-eva-height="48"></i> -->
      <eva-icon
        name="plus-outline"
        animation="pulse"
        fill="#fff"
        width="40px"
        height="40px"
      ></eva-icon>
    </button>
  </div>
</template>
<script>
export default {
  name: "Fab"
};
</script>
<style scoped>
.fab {
  position: fixed;
  background-color: #20c997;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  border-radius: 0.7rem;
  border: none;
  outline: none;
  /* color: #208a9b; */
  right: 15px;
  bottom: 40px;
  z-index: 1000;
  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.11),
    0 3px 6px rgba(0, 0, 0, 0.11) 0 3px 6px rgba(0, 0, 0, 0.11);
  transition: 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.fab:active {
  transform: scale(1.3) !important;

  /* transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg); */
}
/* .fab:hover {
  transform: scale(1.1);
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
} */
</style>
