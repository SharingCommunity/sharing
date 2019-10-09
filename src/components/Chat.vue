<template>
  <div class="chat-bubble" :class="chatClass">
    <div>
      {{ chat.message }}
    </div>
    <div>
      <span class="text-muted">{{ chat.createdAt | moment("from") }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chat",
  props: ["chat"],
  methods: {
    chatClass() {
      return this.chat.sender === this.$store.getters.USER
        ? "sender"
        : "reciever";
    }
  }
};
</script>
<style scoped>
.chat-bubble {
  width: 300px;
  margin: 50px auto;
  border-radius: 15px;
  background: #00bfb6;
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  font-weight: 900;
  font-family: arial;
  position: relative;
}

.reciever:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid #00bfb6;
  border-right: 15px solid transparent;
  border-top: 15px solid #00bfb6;
  border-bottom: 15px solid transparent;
  right: -16px;
  top: 0px;
}

.sender:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 15px solid transparent;
  border-right: 15px solid #00bfb6;
  border-top: 15px solid #00bfb6;
  border-bottom: 15px solid transparent;
  left: -16px;
  top: 0px;
}
</style>
