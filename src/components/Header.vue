<template>
    <div class="mt-2">
        <div class="d-flex justify-content-between">
            <span class="brand">Sharing Logo Here</span>
            <div class="new">
                <b-button
                    v-b-modal.modal1
                    aria-label="heavy plus sign"
                    title="➕ Add new post &#x2795; "
                    variant="danger"
                >New Post</b-button>
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
  font-size: 40px;
}
</style>
