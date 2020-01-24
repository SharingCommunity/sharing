<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="postmodal"
      title="Add a new Post"
      class="postmodal"
      ref="postmodal"
      @show="setMessage"
    >
      <!-- <b-input></b-input> -->
      <slot slot="modal-header">
        <p>💬</p>
        <b-card class="w-100 postinput">{{ this.post.message }}</b-card>
      </slot>
      <div>
        <b-tabs small v-model="tabIndex">
          <b-tab title="Pick a type" ref="tab-1" title-item-class="disabledTab">
            <p>Pick a post type</p>
            <div id="post-type" class="d-flex justify-content-around">
              <div
                class="border d-inline btn"
                @click.stop="goNext($refs.ask.id)"
                ref="ask"
                id="ask"
              >
                <p>
                  <em>ask</em>
                </p>
                <span>👐</span>
              </div>
              <div
                class="border d-inline btn"
                @click.stop="goNext($refs.give.id)"
                ref="give"
                id="give"
              >
                <p>
                  <em>give</em>
                </p>
                <span>🎁</span>
              </div>
            </div>
          </b-tab>
          <b-tab
            title="Select need"
            id="type"
            title-item-class="disabledTab"
            class="text-left"
          >
            <b-row class="py-2">
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >Food 🥪</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >Assignment 📚</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >Care 💕</b-button
                >
              </b-col>
            </b-row>
            <b-row class="py-2">
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >Prayer 🙏</b-button
                >
              </b-col>
              <b-col>
                <b-button @click="goNext($event.target.innerText)"
                  >Money 💲</b-button
                >
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Add Details" id="4" title-item-class="disabledTab">
            <b-alert variant="warning" show dismissible>
              <p>Please add some more details like:</p>
              <ul>
                <li>What kind of food do you want?</li>
                <li>Where can they get it? e.g Room 106 EE</li>
                <li>How much money?</li>
              </ul>
              <p>Anything to make it easier for everyone :)</p>
            </b-alert>

            <div class="form-group">
              <label>Details</label>
              <textarea
                class="sharing-border form-control"
                autofocus
                v-model="post.details"
              ></textarea>
            </div>
            <!-- <b-button
            class="p-2"
              variant="info"
              @click="
                () => {
                  tabIndex++;
                }
              "
              >Next</b-button
            > -->

            <!-- <p>
              <b-card class="w-100 postinput">{{
                this.post.message
              }}</b-card>
            </p> -->
          </b-tab>
          <b-tab title="Send Post" id="5" title-item-class="disabledTab">
            <p>Review your post, when you're ready hit send!</p>
            <!-- <p>
              <b-card class="w-100 postinput">{{
                this.post.message
              }}</b-card>
            </p> -->
          </b-tab>
        </b-tabs>
      </div>
      <slot slot="modal-footer">
        <b-button @click="closeModal">Cancel</b-button>
        <b-button
          @click="
            () => {
              tabIndex++;
            }
          "
          variant="info"
          v-show="tabIndex == 2"
          >Next</b-button
        >
        <b-button @click="tabIndex--" v-show="tabIndex == 3">Back</b-button>
        <b-button @click="sendPost()" variant="success" v-show="tabIndex == 3"
          >Send</b-button
        >
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
        case "ask":
          this.post.message = this.post.message.concat(" I need help with");
          this.post.subject = "ask";
          this.post.asking = true;
          this.tabIndex++;
          break;
        case "give":
          this.post.message = this.post.message.concat(" I can help with");
          this.post.subject = "give";
          this.post.giving = true;
          this.tabIndex++;
          break;
        case "Food 🥪":
          this.post.message = this.post.message.concat(" some Food 🥪");
          this.post.subject = "food";
          this.tabIndex++;
          break;
        case "Assignment 📚":
          this.post.message = this.post.message.concat(" Assignment 📚");
          this.post.subject = "assignment";
          this.tabIndex++;
          break;
        case "Care 💕":
          this.post.message = this.post.message.concat(" Care 💕");
          this.post.subject = "care";
          this.tabIndex++;
          break;
        case "Prayer 🙏":
          this.post.message = this.post.message.concat(" some Prayer 🙏");
          this.post.subject = "prayer";
          this.tabIndex++;
          break;
        case "Money 💲":
          this.post.message = this.post.message.concat(" some Money 💲");
          this.post.subject = "money";
          this.tabIndex++;
          break;
      }
      //   console.log(stage);
    },
    sendPost() {
      let post = {
        message: this.post.message,
        asking: this.post.asking,
        giving: this.post.giving,
        participants: [],
        subject: this.post.subject,
        user: this.$store.getters.USER,
        details: this.post.details
      };
      this.$socket.emit("post", post);
      console.log("Inside here =>", post);
      // this.$store
      this.$store.dispatch("ADD_POST", post);
      this.closeModal();
    },
    setMessage() {
      this.post.message = this.greetings[Math.round(Math.random() * 6)];
    }
  },
  data() {
    return {
      tabIndex: 0,
      greetings: [
        "👋 Hi,",
        "👋 How far,",
        "👋 Hey,",
        "👋 Hello friend,",
        "👋 Senu,",
        "👋 Hi Hi,",
        "👋 Holla,"
      ],
      post: {
        message: "👋 Hi,",
        giving: false,
        asking: false,
        subject: "",
        details: ""
      }
    };
  },
  watch: {
    tabIndex() {
      if (this.tabIndex == 0) {
        this.post.message = "👋 Hi,";
        this.post.giving = false;
        this.post.asking = false;
        this.post.subject = "";
        this.post.details = "";
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
div > .nav-tabs {
  display: none !important;
}
</style>
