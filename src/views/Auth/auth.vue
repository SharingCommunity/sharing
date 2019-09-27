<template>
  <div id="auth">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "AuthComponent",
  data() {
    return {
      inSignup: false
    };
  },
  mounted() {
    console.log("Cookies =>", this.$cookies.keys());
    console.log("Cookies Windows =>", window.$cookies.keys());
    console.log("Cookies :) =>", document.cookie);
  }
};
</script>
<style scoped></style>
