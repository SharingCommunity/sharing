<template>
  <div>
    <div v-if="$store.getters.POSTS.length == 0">
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
        post.status === "Sharing Ongoing" &&
        post.participants.some(u => {
          return u === this.$store.getters.USER;
        })
      ) {
        // this.$router.push({ name: "Post", params: { id } });
        this.$router.push({ name: "Post", params: { id: post._id } });
        console.log("Can't open post bro ");
      } else if (post.status === "Pending Sharing") {
        this.$router.push({ name: "Post", params: { id: post._id } });
      } else {
        console.log("Can't open post bro");
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
