<template>
  <b-card class="fixed-bottom">
    <b-card-body>
      <b-form-input
        placeholder="I have..."
        v-model="payload"
        ref="inputMessage"
        class="form-input"
      >
      </b-form-input>
      <b-button @click="sendMessage($refs.inputMessage.value)" variant="primary"
        >Send</b-button
      >
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "InputComponent",
  data() {
    return {
      payload: ""
    };
  },
  methods: {
    sendMessage(post) {
      this.$emit("post", post);
    }
  }
};
</script>

<style>
.form-input {
  display: inline;
}
</style>
