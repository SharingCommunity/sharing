<template>
  <div id="sidebar" class="my-2 shadow-sm">
    <!-- <b-alert show variant="secondary">{{
      this.$store.getters.USER.Username
    }}</b-alert> -->
    <div class="h100">
      <b-tabs fill pills>
        <b-tab v-b-tooltip.hover title="Posts" class="text-bold" active>
          <template v-slot:title>
            <!-- Uncomment for emoji label -->
            <!-- &#127880; &nbsp; -->
            Posts
          </template>

          <div class="no-posts">
            <p>🤷</p>
            <p>You don't have any posts</p>
          </div>
        </b-tab>
        <b-tab v-b-tooltip.hover title="Chats" class="text-bold">
          <template v-slot:title>
            <!-- Uncomment for emoji label -->
            <!-- &#128172; &nbsp; -->
            Chats
          </template>
          <div class="no-posts">
            <p>🤷</p>
            <p>You don't have any chats</p>
          </div>
        </b-tab>
        <b-tab v-b-tooltip.hover title="Activity" class="text-bold">
          <template v-slot:title>
            <!-- Uncomment for emoji label -->
            <!-- &#9889; &nbsp; -->
            Activity
          </template>
          <div class="no-posts">
            <p>🤷</p>
            <p>Nothing here</p>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent"
};
</script>

<style>
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
ul.nav-pills {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.08) !important;
  background-color: #f9f9f9 !important;
  padding: 0.5rem 0.25rem;
}
</style>
