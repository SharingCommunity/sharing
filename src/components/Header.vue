<template>
  <div class="mt-2">
    <div class="">
      <div class="row">
        <b-col>
          <span class="brand">
            <b>Sharing Logo Here</b>
          </span>
          <span>
            Sharing helps you be a better person. :)
          </span>
        </b-col>
      </div>
      <div class="row">
        <b-col>
          <b-button
            aria-label="About Button"
            title="❤️ About"
            variant="danger-outline"
            class="mx-1"
            >Why tho? ❤️</b-button
          >
          <b-button
            v-b-modal.modal1
            aria-label="heavy plus sign"
            title="✨Add new post"
            variant="danger"
            class="mx-1"
            >New Post ✨</b-button
          >
        </b-col>
      </div>
    </div>
    <post-modal></post-modal>
  </div>
</template>

<script>
import PostModal from "./PostModal.vue";
export default {
  name: "HeaderComponent",
  components: {
    PostModal
  }
};
</script>

<style>
.new {
  font-size: 24px;
  color: cornflowerblue;
  font-weight: 800;
  display: inline;
}
.brand {
  font-size: 20px;
}
</style>
