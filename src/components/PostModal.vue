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
                  Ask
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
                  Give
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
            <table class="table category-table">
              <tr>
                <td class="p-2">
                  <b-button block @click="goNext($event.target.id)" id="type-1"
                    >Food <br />
                    🥪</b-button
                  >
                </td>
                <td class="p-2">
                  <b-button
                    block
                    @click="goNext($event.target.id)"
                    class="small-text"
                    id="type-2"
                    >Assignment <br />📚</b-button
                  >
                </td>
                <td class="p-2">
                  <b-button block @click="goNext($event.target.id)" id="type-3"
                    >Care <br />💕</b-button
                  >
                </td>
              </tr>

              <tr>
                <td class="p-2">
                  <b-button block @click="goNext($event.target.id)" id="type-4"
                    >Prayer <br />🙏</b-button
                  >
                </td>

                <td>
                  <b-button block @click="goNext($event.target.id)" id="type-5"
                    >Item <br />🏷️</b-button
                  >
                </td>

                <td>
                  <b-button block @click="goNext($event.target.id)" id="type-6"
                    >Others <br />✳️</b-button
                  >
                </td>
              </tr>
            </table>
          </b-tab>
          <b-tab title="Add Details" id="4" title-item-class="disabledTab">
            <b-alert variant="warning" show dismissible>
              <p>Try to be specific :)</p>
            </b-alert>

            <div class="form-group mt-3 text-left">
              <label>Short Name</label>
              <input
                class="sharing-border form-control"
                autofocus
                required
                placeholder="e.g Hausa Dictionary"
                v-model="post.short_name"
              />
            </div>

            <div class="form-group text-left">
              <label>Details</label>
              <textarea
                class="sharing-border form-control"
                placeholder="e.g Room 206 FF, 5pm"
                autofocus
                required
                v-model="post.details"
                v-on:keyup.prevent.enter="tabIndex++"
              ></textarea>
            </div>
          </b-tab>
          <b-tab title="Send Post" id="5" title-item-class="disabledTab">
            <p>Review your post, when you're ready hit send!</p>
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
        case "type-1":
          this.post.message = this.post.message.concat(" some Food 🥪");
          this.post.subject = "food";
          this.tabIndex++;
          break;
        case "type-2":
          this.post.message = this.post.message.concat(" Assignment 📚");
          this.post.subject = "assignment";
          this.tabIndex++;
          break;
        case "type-3":
          this.post.message = this.post.message.concat(" Care 💕");
          this.post.subject = "care";
          this.tabIndex++;
          break;
        case "type-4":
          this.post.message = this.post.message.concat(" some Prayer 🙏");
          this.post.subject = "prayer";
          this.tabIndex++;
          break;
        case "type-5":
          this.post.message = this.post.message.concat(" an item 🏷️");
          this.post.subject = "item";
          this.tabIndex++;
          break;
        case "type-6":
          this.post.message = this.post.message.concat(" something ✳️");
          this.post.subject = "other";
          this.tabIndex++;
          break;
      }
      //   console.log(stage);
    },
    sendPost() {
      let post = {
        message: this.post.message.trim(),
        asking: this.post.asking,
        giving: this.post.giving,
        participants: [],
        subject: this.post.subject,
        user: this.$store.getters.USER,
        details: this.post.details.trim(),
        short_name: this.post.short_name.trim()
      };

      this.$socket.emit("post", post);
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
        "👋 Sannu,",
        "👋 Hi Hi,",
        "👋 Holla,",
        "👋 Hello,",
        "👋 Hiii,"
      ],
      post: {
        message: "👋 Hi,",
        giving: false,
        asking: false,
        subject: "",
        details: "",
        short_name: ""
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
        this.post.short_name = "";
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
#type .category-table button {
  border: none !important;
  background-color: #ffb2b2;
  transition: border 0.1s ease-out;
}

.category-table {
  table-layout: fixed !important;
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
