<template>
  <b-card class="fixed-bottom">
    <b-card-body>
      <b-form-input
        @keydown.enter="sendMessage"
        placeholder="I have..."
        v-model="message"
        class="form-input"
      >
      </b-form-input>
      <b-button @click="sendMessage" variant="primary">Send</b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "InputComponent",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sendMessage() {
      let msg = this.message.trim();
      this.$emit("post", msg);
    }
  }
};
</script>

<style>
.form-input {
  display: inline;
}
</style>
