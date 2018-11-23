<template>
  <div id="main-view" class="my-2 p-2">
    <p>Newest Posts</p>
    <div>
      <b-card v-for="(post, i) in $store.getters.POSTS" :key="i" class="post">
        {{post.postmessage}}
        <p>Created: {{post.created | moment("HH:MM, DD-MM-YY")}}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>
<style scoped>
#main-view {
  border-radius: 8px;
  height: auto;
  /* background-color: #d1ecf1; */
}
.post {
  background-color: #d1ecf1;
  width: 100px;
  overflow: hidden;
  border-radius: 8px !important;
  height: auto;
}
</style>
