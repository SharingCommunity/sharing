<template>
  <div>
    <!-- spinner loader -->
    <b-spinner
      variant="dark"
      style="width: 3rem; height: 3rem;"
      v-show="$store.getters.loading_posts"
    ></b-spinner>
    <!-- spinner loader -->

    <div
      v-if="$store.getters.POSTS.length == 0 && !$store.getters.loading_posts"
    >
      <p>🔦</p>
      <p>No posts yet</p>
      <p>Click the plus button to add a new one</p>
    </div>
    <div class="post-grid">
      <div v-for="post in $store.getters.POSTS" :key="post._id">
        <post-component
          :post="post"
          :id="post._id"
          class="post"
          @open-post="openPost(post)"
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
  },
  data() {
    return {
      activePost: ""
    };
  },
  methods: {
    openPost(post) {
      if (
        post.status === "ongoing" &&
        post.participants.some(u => {
          return u === this.$store.getters.USER;
        })
      ) {
        // this.$router.push({ name: "Post", params: { id } });
        this.$router.push({ name: "Post", params: { id: post._id } });
      } else if (post.status === "pending") {
        this.$router.push({ name: "Post", params: { id: post._id } });
      } else {
        this.$bvToast.toast("This post is already in progress", {
          title: "Woops! Can't view post",
          solid: true,
          variant: "info"
        });
      }
    }
  }
};
</script>
<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 8px;
}
@media screen and (max-width: 630px) {
  .post-grid {
    grid-template-columns: 1fr;
    grid-gap: 5px;
    row-gap: 12px;
  }
}
</style>
