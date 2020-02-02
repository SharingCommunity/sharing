<template>
  <div
    @click="$emit('open-post')"
    :id="id"
    class="mx-1 card d-flex"
    :title="post.createdAt | moment('from')"
  >
    <!-- <div class="d-flex justify-content-between post-details px-1">
      <span class="badge">{{ post.giving | postType }}</span>
    </div> -->
    <div class="p-2">
      <p class="post-text my-1 align-self-center">
        {{ post.message }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <span class="badge" v-bind:class="postStyle"
        ><i>{{ post.giving | postType }}</i></span
      >
      <!-- <small class="text-muted"
        >Posted {{ post.createdAt | moment("from") }}</small
      > -->
      <small class="text-muted">
        Expires in
        <!-- {{
          this.$moment(post.createdAt)
            .add(12, "hours")
            .diff(post.createdAt, true)
        }} -->
        {{
          this.$moment(post.createdAt)
            .add(12, "hours")
            .diff(this.$moment(), "hours")
        }}
        hours
      </small>

      <b-dropdown
        v-if="showOptions"
        size="sm"
        variant="link"
        right
        :toggle-class="classes"
        no-caret
      >
        <template v-slot:button-content>
          <eva-icon
            name="more-vertical-outline"
            fill="#00000050"
            width="25px"
            height="25px"
          ></eva-icon>
        </template>
        <b-dropdown-item class="button" @click="deletePost"
          >Delete</b-dropdown-item
        >
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true
    },
    id: {
      type: [String, Number]
    },
    showOptions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      classes: ["text-decoration-none", "p-0", "pl-2"]
    };
  },
  filters: {
    postType(type) {
      return type ? "Giving" : "Asking";
    }
  },
  computed: {
    postStyle: function() {
      return this.post.giving ? "red-style" : "blue-style";
    }
  },
  methods: {
    deletePost() {
      this.$emit("delete-post");
    }
  }
};
</script>

<style scoped>
.post {
  /* background-color: #d1ecf1;*/
  background-color: #ffffff;
  overflow: auto;
  border-radius: 8px !important;
  /* height: 100px; */
  /* max-height: 130px; */
  max-width: 100%;
  border: 3px solid #bee5eb;
  cursor: pointer;
  transition: border 0.2s ease-out;
}
.post-text {
  font-size: 16px;
  font-weight: 500;
}
.no-click {
  user-select: none;
}
.action-button {
  widows: 50px;
  height: 50px;
}
.post .card-text {
  font-size: 18px;
  /* font-weight: bold; */
}
.post .post-details {
  /* background-color: #bee5eb; */
  background-color: #d1ecf1;
  /* color: #ffffff; */
  flex-direction: column;
  font-weight: bold;
  transition: background-color 0.2s ease-out;
}
.post:hover {
  border-color: #f79292;
}
.post:hover .post-details {
  background-color: #ffb2b2;
}
.post .card-footer {
  border-color: #bee5eb !important;
}
</style>
