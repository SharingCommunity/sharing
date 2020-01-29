<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
    <button v-if="updateExists" @click="refreshApp">
      New version available! Click to update
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    };
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
  // created() {
  //   document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
  //   navigator.serviceWorker.addEventListener("controllerchange", () => {
  //     if (this.refreshing) return;
  //     this.refreshing = true;
  //     window.location.reload();
  //   });
  // }
};
</script>

<style src="./App.css"></style>
