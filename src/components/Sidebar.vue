<template>
  <div id="sidebar" class="my-2 shadow-sm">
    <b-alert show variant="secondary">Your posts show up here</b-alert>
    <h2>Yaga</h2>
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
</style>
