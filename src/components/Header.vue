<template>
  <div class="text-center p-1 pt-3 mb-2" id="header">
    <!-- <h5 class="mb-0 text-bold">Sharing App</h5> -->
    <p class="lead">
      Look around and start sharing 💕
    </p>
    <b-alert variant="success" show dismissible>
      Showing Latest posts from the last 12 hours
    </b-alert>
    <!-- <b-button class="new-post-button" v-b-modal.postmodal>New Post</b-button> -->
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      showAlert: true
    };
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
.new-post-button {
  background-color: rgb(223, 7, 50) !important;
  border: 2px solid rgb(223, 7, 50) !important;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17) !important;
  padding: 0.5em 1.2em !important;
  box-sizing: border-box;
  position: relative;
  transition: box-shadow 0.3s;
}
.new-post-button:active {
  top: 0.1rem !important;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.4);
}
.btn-6 {
  display: inline-block;
  padding: 0.2em 1.2em;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  color: #ffffff;
  background-color: #3369ff;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  border: none !important;
}
.btn-6:active {
  top: 0.1em;
}
@media all and (max-width: 30em) {
  .btn-6 {
    display: block;
    margin: 0.4em auto;
  }
}
.brand {
  font-size: 20px;
}
.header {
  margin-bottom: 0.5rem;
}
.card {
  margin: 0;
}
.p15 {
  padding: 0px 15px !important;
}
</style>
