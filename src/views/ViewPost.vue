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
        <div v-if="isParticipant && post.status === 'Sharing Ongoing'">
          <h3>Chat</h3>
          <p class="text-muted">Start typing to chat</p>
          <div>
            <chat v-for="chat in post.chats" :chat="chat" :key="chat._id">
            </chat>
          </div>

          <div class="shadow-sm fixed-bottom">
            <b-input-group size="lg" class="mt-3">
              <b-form-input v-model="message" autofocus></b-form-input>
              <b-input-group-append>
                <b-button variant="success" @click="sendChat">Send</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>

        <!-- If its the same user -->
        <b-card v-else-if="sameUser && post.status === 'Pending Sharing'">
          <b-card-body>
            Sorry you can't chat open your post until someone responds to it
          </b-card-body>
        </b-card>

        <b-card v-else-if="!sameUser && post.asking">
          <b-card-body>
            <h4>Want to help out?</h4>
            <b-button @click="startSharing" class="mb-3" variant="success" block
              >Yes</b-button
            >
            <b-button variant="secondary" block>Nah</b-button>
          </b-card-body>
        </b-card>

        <b-card v-else-if="!sameUser && post.giving">
          <b-card-body>
            <h4>Something you need?</h4>
            <b-button @click="startSharing" class="mb-3" variant="success" block
              >Yes</b-button
            >
            <b-button variant="secondary" block>Nah</b-button>
          </b-card-body>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import Post from "../components/Post.vue";
import Chat from "../components/Chat.vue";
export default {
  name: "ViewPost",
  components: {
    Post,
    Chat
  },
  props: ["id"],
  data() {
    return {
      post: "",
      message: "",
      sameUser: false
    };
  },
  methods: {
    close() {
      this.$router.back();
    },
    sendChat() {
      let chat = {
        message: this.message,
        post: this.post._id,
        from: this.$store.getters.USER,
        to: this.post.user,
        time: new Date()
      };
      this.$socket.emit("chat", chat);
    },
    startSharing() {
      this.$socket.emit("start-sharing", this.post._id);
      // TODO:
      // Recieve response from server then change the status of post to 'Ongoing Sharing'
    },
    isParticipant() {
      return this.post.participants.some(p => {
        return p === this.$store.getters.USER;
      });
    }
  },
  mounted() {
    this.post = this.$store.getters.POST(this.id);
    this.sameUser = this.post.user === this.$store.getters.USER;
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
</style>
