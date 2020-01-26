<template>
  <div class="fullscreen">
    <b-navbar
      class="shadow mb-4 sticky justify-content-between bg-dark text-white"
    >
      <h5 class="m-0 text-whtie">View Post</h5>
      <div class="btn bg-none close" @click="close">
        <eva-icon
          name="close-outline"
          fill="white"
          width="30px"
          height="30px"
        ></eva-icon>
      </div>
    </b-navbar>

    <!-- Main Content -->
    <b-container fluid>
      <b-alert
        show
        class="mt-4"
        variant="warning"
        dismiss-label="Got it!"
        dismissible
      >
        You can talk to the poster if you can help out. Please keep the
        conversation simple and straight to the point. No time :)
      </b-alert>
      <post :post="post"></post>
      <!-- <hr class="mt-4 bg-dark" /> -->

      <div class="text-left mb-5">
        <h4 class="mt-2">Description</h4>
        <p>{{ post.details || "No description :(" }}</p>

        <hr />
        <div v-if="isParticipant && post.status === 'ongoing'">
          <h3>Chat</h3>
          <p class="text-muted">Start typing to chat</p>
          <transition-group name="bounce" tag="div">
            <chat
              v-for="chat in post.chats"
              :chat="chat"
              :key="chat._id"
              class="list-item"
            >
            </chat>
          </transition-group>

          <div class="shadow-sm">
            <b-input-group size="lg" class="mt-3">
              <b-form-input v-model="message" autofocus></b-form-input>
              <b-input-group-append>
                <b-button variant="success" @click="sendChat">Send</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>

        <!-- If its the same user -->
        <b-card v-else-if="sameUser && post.status === 'pending'">
          <b-card-body>
            Sorry you can't chat until someone responds to your post
          </b-card-body>
        </b-card>

        <b-card v-else-if="!sameUser && post.asking">
          <b-card-body>
            <h4>Want to help out?</h4>
            <b-button @click="startSharing" class="mb-3" variant="success" block
              >Yes</b-button
            >
            <b-button variant="secondary" @click="goBackHome" block
              >Nah</b-button
            >
          </b-card-body>
        </b-card>

        <b-card v-else-if="!sameUser && post.giving">
          <b-card-body>
            <h4>Something you need?</h4>
            <b-button @click="startSharing" class="mb-3" variant="success" block
              >Yes</b-button
            >
            <b-button variant="secondary" @click="goBackHome" block
              >Nah</b-button
            >
          </b-card-body>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import Post from "../components/Post.vue";
import Chat from "../components/Chat.vue";
import store from "../store.js";

export default {
  name: "ViewPost",
  components: {
    Post,
    Chat
  },
  props: ["id"],
  data() {
    return {
      message: "",
      sameUser: false
    };
  },
  computed: {
    post() {
      return store.getters.POST(this.id);
    }
  },
  sockets: {
    post_updated: function(post) {
      this.$store.dispatch("UPDATE_POST", post);
    },
    new_chat: function(chat) {
      this.$store.dispatch("ADD_CHAT", chat);
    }
  },
  methods: {
    close() {
      this.$router.back();
    },
    goBackHome() {
      this.$router.push("/home");
    },
    sendChat() {
      let chat = {
        message: this.message,
        post: this.post._id,
        from: this.$store.getters.USER,
        participants: this.post.participants,
        time: new Date()
      };
      this.$socket.emit("chat", chat);
      this.message = "";
    },
    startSharing() {
      this.$socket.emit("start_sharing", this.post._id);
      console.log("Sharing =>", this.post._id);
    },
    isParticipant() {
      return this.post.participants.some(p => {
        return p === this.$store.getters.USER;
      });
    }
  },
  mounted() {
    // this.post = this.$store.getters.POST(this.id);
    if (!this.$store.getters.POSTS) {
      this.$store.dispatch("SET_POSTS");
    }
    this.sameUser = this.post.user === this.$store.getters.USER;
  },
  beforeDestroy() {
    this.$socket.removeListener("post_updated", this.handlePostUpdate);

    this.$socket.removeListener("chat", this.handleNewChat);
  },
  destroyed() {
    console.log("ViewPost component Just destroyed :)");
  }
};
</script>
<style scoped>
.fullscreen {
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  height: 100% !important;
  margin: 0 !important;
}
.close {
  padding: 0.3rem;
  border-radius: 0.3rem;
  background-color: rgba(000, 000, 000, 0) !important;
  transition: background-color 0.2s ease-out;
}
.close:active {
  background-color: rgba(000, 000, 000, 0.4) !important;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
