<template>
  <div id="sidebar" class="my-2 shadow-sm">
    <b-alert show variant="secondary">Your posts show up here</b-alert>
    <div class="no-posts">
      <p>🤷</p>
      <p>You don't have any posts</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent"
};
</script>

<style scoped>
#sidebar {
  background-color: #d1ecf1;
  border: 2px solid #bee5eb;
  border-radius: 8px;
  height: 80%;
  width: 100%;
}
.no-posts p:first-child {
  font-size: 40px;
}
.no-posts {
  font-size: 30px;
}
</style>
