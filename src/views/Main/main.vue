<template>
  <div id="main-view" class="my-2 p-2">
    <div v-if="$store.getters.POSTS.length == 0">
      <p>🔦</p>
      <p>No posts yet</p>
    </div>
    <div class="post-grid">
      <div v-for="post in $store.getters.POSTS" :key="post._id">
        <post-component
          :post="post"
          :id="post._id"
          class="post"
        ></post-component>
      </div>
    </div>
    <post-modal></post-modal>
  </div>
</template>

<script>
import PostComponent from "../../components/Post.vue";
import PostModal from "../../components/PostModal.vue";
export default {
  name: "Main",
  components: {
    PostComponent,
    PostModal
  }
};
</script>
<style scoped>
#main-view {
  border-radius: 8px;
  height: auto;
  /* background-color: #d1ecf1; */
}
.post-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 8px;
}
@media screen and (max-width: 630px) {
  .post-grid {
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }
}
</style>
