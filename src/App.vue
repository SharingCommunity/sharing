<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
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
  //   // document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
  //   // navigator.serviceWorker.addEventListener("controllerchange", () => {
  //   //   if (this.refreshing) return;
  //   //   this.refreshing = true;
  //   //   window.location.reload();
  //   // });

  //   // if ("Notification" in window && navigator.serviceWorker) {
  //   //   // Display the UI to let the user toggle notifications
  //   //   Notification.requestPermission(function(status) {
  //   //     console.log("Notification permission status:", status);
  //   //   });
  //   // }
  // }
};
</script>

<style src="./App.css"></style>
