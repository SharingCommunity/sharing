<template>
  <div
    class="chat-bubble"
    :class="this.chat.from === this.$store.getters.USER_ID ? 'mine' : 'theirs'"
  >
    <div class="chat-message">
      {{ chat.message }}
    </div>
    <div class="text-muted chat-detail">
      <span>{{ chat.createdAt | moment("hh:mm a") }}</span>
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
  color: #ffffff !important;
  padding: 6px 12px;
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

.yours {
  align-items: flex-start;
}

.mine {
  align-items: flex-end;
}

.chat-bubble.theirs {
  background-color: #8bc34a;
  margin-right: auto;
  margin-left: 1px;
}

.mine::after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: #ffffff;
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
  background: #2196f3;
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.chat-message {
  position: relative;
}

.chat-detail {
  font-size: 11px;
  text-align: right !important;
  font-weight: 100;
  /* color: rgba(255, 255, 255, 0.6) !important; */
}

.chat-bubble.mine {
  background-color: #2196f3;
  margin-left: auto;
  margin-right: 1px;
}

.theirs::before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #8bc34a;
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
  background: #ffffff;
  border-bottom-right-radius: 10px;
}
</style>
