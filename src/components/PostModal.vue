<template>
  <div id="postmodal">
    <!-- Modal Component -->
    <b-modal
      id="modal1"
      title="Add a new Post"
      class="postmodal"
      ref="postmodal"
    >
      <!-- <b-input></b-input> -->
      <slot slot="modal-header">
        <p>💬</p>
        <b-card class="w-100 postinput">{{ this.post.postmessage }}</b-card>
      </slot>
      <div>
        <b-tabs small v-model="tabIndex">
          <b-tab title="Tab 1" ref="tab-1" title-item-class="disabledTab">
            <p>Pick a post type</p>
            <div id="post-type" class="d-flex justify-content-around">
              <div
                class="border d-inline btn"
                @click.stop="goNext($refs.request.id)"
                ref="request"
                id="request"
              >
                <p>
                  <em>request</em>
                </p>
                <span>👐</span>
              </div>
              <div
                class="border d-inline btn"
                @click.stop="goNext($refs.offer.id)"
                ref="offer"
                id="offer"
              >
                <p>
                  <em>offer</em>
                </p>
                <span>🎁</span>
              </div>
            </div>
          </b-tab>
          <b-tab
            title="Tab 2"
            id="type"
            title-item-class="disabledTab"
            class="text-left"
          >
            <b-row class="py-2">
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >🥪 Food</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >📚 Assignment</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >💕 Care</b-button
                >
              </b-col>
            </b-row>
            <b-row class="py-2">
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >🙏 Prayer</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >💲 Money</b-button
                >
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Send Post" id="4" title-item-class="disabledTab">
            <p>Review your post, when you're ready hit send!</p>
            <p>
              <b-card class="w-100 postinput">{{
                this.post.postmessage
              }}</b-card>
            </p>
          </b-tab>
        </b-tabs>
      </div>
      <slot slot="modal-footer">
        <b-button @click="closeModal">Cancel</b-button>
        <b-button @click="sendPost()" variant="success" v-show="tabIndex == 2"
          >Send</b-button
        >
        <!-- <b-button @click="()=>{tabIndex++}">Next</b-button> -->
      </slot>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PostModal",
  methods: {
    closeModal() {
      this.$refs.postmodal.hide();
      this.tabIndex = 0;
    },
    goNext(stage) {
      // Match choice
      switch (stage) {
        case "request":
          this.post.postmessage = this.post.postmessage.concat(
            " I need help with"
          );
          this.post.post_subject = "request";
          this.post.request = true;
          this.tabIndex++;
          break;
        case "offer":
          this.post.postmessage = this.post.postmessage.concat(
            " I can help with"
          );
          this.post.post_subject = "offer";
          this.post.offer = true;
          this.tabIndex++;
          break;
        case "🥪 Food":
          this.post.postmessage = this.post.postmessage.concat(" some 🥪 Food");
          this.post.post_subject = "food";
          this.tabIndex++;
          break;
        case "📚 Assignment":
          this.post.postmessage = this.post.postmessage.concat(
            " 📚 Assignment"
          );
          this.post.post_subject = "assignment";
          this.tabIndex++;
          break;
        case "💕 Care":
          this.post.postmessage = this.post.postmessage.concat(" 💕 Care");
          this.post.post_subject = "care";
          this.tabIndex++;
          break;
        case "🙏 Prayer":
          this.post.postmessage = this.post.postmessage.concat(
            " some 🙏 Prayer"
          );
          this.post.post_subject = "prayer";
          this.tabIndex++;
          break;
        case "💲 Money":
          this.post.postmessage = this.post.postmessage.concat(
            " some 💲 Money"
          );
          this.post.post_subject = "money";
          this.tabIndex++;
          break;
      }
      //   console.log(stage);
    },
    sendPost() {
      let post = {
        postmessage: this.post.postmessage,
        request: this.post.request,
        offer: this.post.offer,
        post_subject: this.post.post_subject
      };
      this.$socket.emit("post", post);
      this.closeModal();
    }
  },
  data() {
    return {
      tabIndex: 0,
      post: {
        postmessage: "👋 Hi,",
        offer: null,
        request: null,
        post_subject: null
      }
    };
  },
  watch: {
    tabIndex() {
      if (this.tabIndex == 0) {
        this.post.postmessage = "👋 Hi,";
        this.post.offer = null;
        this.post.request = null;
        this.post.post_subject = null;
      }
      // console.log("changed!");
    }
  }
};
</script>

<style>
.modal-content {
  /* background-color: aqua !important; */
  padding: 0.25rem !important;
  border: none !important;
}
.modal-header {
  padding: 0.25rem !important;
  border: none !important;
  height: 4rem;
}
.modal-footer {
  padding: 0.25rem !important;
  border: none !important;
}
.modal-body {
  padding: 0.25rem !important;
  border: none !important;
}
.modal-header .card-body {
  padding: 0.25rem !important;
}
.postinput {
  height: fit-content;
  max-height: 60px;
  overflow: auto;
}
.modal-header p {
  padding: 0.25rem;
  padding-left: 0;
  font-size: 24px;
}
#post-type div {
  width: 90px;
  height: 100px;
  background-color: #ffb2b2;
  transition: all 0.1s ease;
  border-radius: 8px !important;
}
#post-type div:hover {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
#post-type div:focus {
  border: 3px solid #f79292;
}
#post-type div span {
  font-size: 40px;
}
#type .row button {
  border: none !important;
  background-color: #ffb2b2;
  transition: border 0.1s ease-out;
}
#type .row button:hover {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.disabledTab {
  pointer-events: none;
}
</style>
