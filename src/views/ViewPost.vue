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
      <div v-if="post">
        <post :post="post"></post>
        <!-- <hr class="mt-4 bg-dark" /> -->

        <div class="text-left mb-5">
          <h4 class="my-2 font-weight-bold font-size-16">Name</h4>
          <p>{{ post.short_name || "No name :(" }}</p>

          <h4 class="m-0 font-weight-bold font-size-16">Description</h4>
          <p>{{ post.details || "No description :(" }}</p>

          <p>
            <b-button variant="info" @click="finish">Finish</b-button>
          </p>

          <hr />
          <div v-if="isParticipant && post.status === 'ongoing'" class="chats">
            <h3 class="font-size-20 font-weight-bold text-center text-black-50">
              Chat
            </h3>
            <p class="text-muted text-center">Start typing to chat</p>
            <transition-group name="bounce" tag="div">
              <chat v-for="chat in post.chats" :chat="chat" :key="chat._id">
              </chat>
            </transition-group>

            <div class="shadow-sm fixed-bottom mb-2 px-2">
              <b-input-group size="lg" class="mt-3">
                <b-form-input
                  @keydown.enter="sendChat"
                  v-model="message"
                  autofocus
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="success" @click="sendChat">
                    <eva-icon
                      name="paper-plane-outline"
                      fill="white"
                      width="28px"
                      height="28px"
                    ></eva-icon
                  ></b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>

          <!-- If its the same user -->
          <b-card v-else>
            <b-card-body v-if="sameUser && post.status === 'pending'">
              Sorry you can't chat until someone responds to your post
            </b-card-body>

            <b-card-body v-else-if="!sameUser">
              <h4 v-if="post.asking">Want to help out?</h4>

              <h4 v-else>Something you need?</h4>

              <b-button
                @click="startSharing"
                class="mb-3"
                variant="success"
                block
                >Yes</b-button
              >
              <b-button variant="secondary" @click="goBackHome" block
                >Nah</b-button
              >
            </b-card-body>
          </b-card>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import Post from "../components/Post.vue";
import Chat from "../components/Chat.vue";
import API from "../config";
// import store from "../store";

export default {
  name: "ViewPost",
  components: {
    Post,
    Chat
  },
  data() {
    return {
      message: "",
      id: this.$route.params.id
    };
  },
  computed: {
    post() {
      return this.$store.getters.POST(this.id);
    },
    sameUser() {
      return this.post.user === this.$store.getters.USER_ID;
    }
  },
  sockets: {
    post_updated: function(post) {
      this.$store.dispatch("UPDATE_POST", post);
      console.log("Post updated");
    },
    new_chat: function(chat) {
      console.log("New Chat o");
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
        from: this.$store.getters.USER_ID,
        participants: this.post.participants,
        time: new Date()
      };
      this.$socket.emit("chat", chat);
      this.message = "";
    },
    startSharing() {
      this.$socket.emit("start_sharing", this.post._id);
    },
    finish() {
      this.$http
        .post(
          `${API}/api/posts/finish/${this.id}`,
          { closed_by: this.$store.getters.USER_ID },
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.$bvToast.toast("Success!", {
            title: "Post closed successfully!",
            autoHideDelay: 5000,
            solid: true,
            variant: "success"
          });
          console.log("Post updated! =>", response.data);
          this.close();
        })
        .catch(err => {
          this.$bvToast.toast("Error!", {
            title: "Could not update Post",
            autoHideDelay: 5000,
            solid: true,
            variant: "danger"
          });
          console.log("Error =>", err);
        });
    },
    isParticipant() {
      return this.post.participants.some(p => {
        return p === this.$store.getters.USER_ID;
      });
    }
  },
  created() {
    this.$store.dispatch("SET_POSTS");

    if (window.localStorage.getItem("wg_user") !== "undefined") {
      this.$store.dispatch(
        "SET_USER",
        JSON.parse(window.localStorage.getItem("wg_user"))
      );
    } else {
      console.log("Fetching user ...");
      this.$store.dispatch("FETCH_USER");
    }
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
  background-color: #ffffff !important;
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
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.chats {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
}

.font-size-16 {
  font-size: 16px !important;
}

.font-size-18 {
  font-size: 18px !important;
}

.font-size-20 {
  font-size: 20px !important;
}
</style>
