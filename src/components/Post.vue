<template>
    <div :id="id" class="mx-1 d-flex" :title="post.created | moment('from')">
        <div class="d-flex justify-content-between post-details px-1">
            <span>{{post.offer | postType}}</span>
            <small class="text-muted">Posted {{post.created | moment("from")}}</small>
        </div>
        <p class="card-text my-1 align-self-center">{{post.postmessage}}</p>
        <div></div>
    </div>
</template>

<script>
export default {
  name: "PostComponent",
  props: ["post", "id"],
  filters: {
    postType(type) {
      return type == "offer" ? "OFFER" : "REQUEST";
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
  height: 100px;
  max-height: 130px;
  max-width: 100%;
  border: 3px solid #bee5eb;
  cursor: pointer;
  transition: border 0.2s ease-out;
}
.post p {
  font-size: 20px;
  font-weight: bold;
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
</style>
