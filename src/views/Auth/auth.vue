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
  }
};
</script>
<style scoped></style>
