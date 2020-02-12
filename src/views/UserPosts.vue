<template>
  <div id="events">
    <b-navbar
      class="shadow mb-4 sticky justify-content-between bg-solid text-white"
    >
      <!-- Should be a 'back arrow' -->
      <div class="btn bg-none close" @click="back">
        <eva-icon
          name="arrow-back-outline"
          fill="white"
          width="30px"
          height="30px"
        ></eva-icon>
      </div>
      <h5 class="m-0 text-whtie">Your Posts</h5>
    </b-navbar>

    <div class="container-fluid">
      <h5>
        Showing your <span> {{ posts.length }} Posts</span>
      </h5>
      <hr class="mb-4" />
      <div v-for="post in posts" :key="post._id">
        <post
          :post="post"
          @delete-post="deletePost(post._id)"
          @open-post="openPost(post)"
          showOptions
        ></post>
      </div>
    </div>
  </div>
</template>
<script>
import Post from "../components/Post.vue";
import API from "../config";
export default {
  name: "UserPostsComponent",
  components: {
    Post
  },
  methods: {
    back() {
      this.$router.back();
    },
    deletePost(id) {
      this.$http
        .post(
          `${API}/api/posts/delete/${id}`,
          { closed_by: this.$store.getters.USER_ID },
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.$bvToast.toast("Success!", {
            title: "Post deleted successfully!",
            autoHideDelay: 5000,
            solid: true,
            variant: "success"
          });
          console.log("Post deleted! =>", response.data);
          this.back();
        })
        .catch(err => {
          this.$bvToast.toast("Error!", {
            title: "Could not delete Post",
            autoHideDelay: 5000,
            solid: true,
            variant: "danger"
          });
          console.log("Error =>", err);
        });
    },
    openPost(post) {
      if (
        post.participants.some(u => {
          return u === this.$store.getters.USER_ID;
        })
      ) {
        // this.$router.push({ name: "Post", params: { id } });
        this.$router.push({
          name: "Post",
          params: { id: post._id }
        });
      } else {
        this.$router.push({
          name: "Post",
          params: { id: post._id }
        });
      }
    }
  },
  computed: {
    posts() {
      return this.$store.getters.USER_POSTS;
    }
  },
  created() {
    this.$store.dispatch("FETCH_USER_POSTS");
    // this.$store.dispatch("FETCH_POSTS");
  }
};
</script>
<style scoped>
.close {
  padding: 0.3rem;
  border-radius: 0.3rem;
  background-color: rgba(000, 000, 000, 0) !important;
  transition: background-color 0.2s ease-out;
}
.close:active {
  background-color: rgba(000, 000, 000, 0.4) !important;
}
</style>
