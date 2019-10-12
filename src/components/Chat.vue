<template>
  <div
    class="chat-bubble"
    :class="this.chat.from === this.$store.getters.USER ? 'sender' : 'reciever'"
  >
    <div class="chat-message">
      {{ chat.message }}
    </div>
    <div class="chat-detail">
      <span>{{ chat.createdAt | moment("hh:mm") }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chat",
  props: ["chat"]
};
</script>
<style scoped>
.chat-bubble {
  width: fit-content;
  max-width: 350px;
  min-width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 0.5rem;
  text-align: left;
  position: relative;
  display: block;
}

.chat-message {
  position: relative;
}

.chat-bubble .chat-detail {
  font-size: 12px;
  text-align: right !important;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.6);
}

.chat-bubble.reciever {
  background-color: darksalmon;
  margin-right: auto;
  margin-left: 14px;
}

.chat-bubble.sender {
  background-color: cornflowerblue;
  margin-left: auto;
  margin-right: 14px;
}

.reciever:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 25px solid darksalmon;
  border-top: 15px solid darksalmon;
  border-bottom: 10px solid transparent;
  left: -10px;
  top: 1px;
}

.sender:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 25px solid cornflowerblue;
  border-right: 10px solid transparent;
  border-top: 15px solid cornflowerblue;
  border-bottom: 10px solid transparent;
  right: -10px;
  top: 1px;
}
</style>
