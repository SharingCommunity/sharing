<template>
  <div
    class="chat-bubble"
    :class="this.chat.from === this.$store.getters.USER ? 'sender' : 'reciever'"
  >
    <div class="chat-message">
      {{ chat.message }}
    </div>
    <div class="text-muted">
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
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
  text-align: left;
  position: relative;
  display: block;
  background-attachment: fixed;
}

/* .messages {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
} */

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.mine {
  align-items: flex-end;
}

.mine .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  position: relative;
}

.chat-bubble.theirs {
  background-color: darksalmon;
  margin-right: auto;
  margin-left: 14px;
}

.mine::after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: cornflowerblue;
  border-bottom-left-radius: 10px;
}

.mine::before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  /* background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%); */
  background: cornflowerblue;
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.chat-message {
  position: relative;
}

.chat-bubble .chat-detail {
  font-size: 12px;
  text-align: right !important;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.7);
}

.chat-bubble.mine {
  background-color: cornflowerblue;
  margin-left: auto;
  margin-right: 14px;
}

.theirs::before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: salmon;
  border-bottom-right-radius: 15px;
}

.theirs::after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
}
</style>
