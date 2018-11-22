<template>
    <div id="postmodal">
        <!-- Modal Component -->
        <b-modal id="modal1" title="Add a new Post" class="postmodal" ref="postmodal">
            <!-- <b-input></b-input> -->
            <slot slot="modal-header">
                <p>💬</p>
                <b-card class="w-100 postinput">{{postmessage}}</b-card>
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
                    <b-tab title="Tab 2" id="type" title-item-class="disabledTab" class="text-left">
                        <b-row class="py-2">
                            <b-col>
                                <b-button @click="goNext($event.target.innerText)">🥪 Food</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="goNext($event.target.innerText)">📚 Assignment</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="goNext($event.target.innerText)">💕 Care</b-button>
                            </b-col>
                        </b-row>
                        <b-row class="py-2">
                            <b-col>
                                <b-button @click="goNext($event.target.innerText)">🙏 Prayer</b-button>
                            </b-col>
                            <b-col>
                                <b-button @click="goNext($event.target.innerText)">💲 Money</b-button>
                            </b-col>
                        </b-row>
                    </b-tab>
                    <b-tab title="Send Post" id="4" title-item-class="disabledTab">
                        <p>Review your post, when you're ready hit send!</p>
                    </b-tab>
                </b-tabs>
            </div>
            <slot slot="modal-footer">
                <b-button @click="closeModal">Cancel</b-button>
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
          this.postmessage = this.postmessage.concat(" I need help with");
          this.post.tags.push("request");
          this.tabIndex++;
          break;
        case "give":
          this.postmessage = this.postmessage.concat(" I can help you with");
          this.post.tags.push("give");
          this.tabIndex++;
          break;
        case "🥪 Food":
          this.postmessage = this.postmessage.concat(" some 🥪 Food");
          this.post.tags.push("food");
          this.tabIndex++;
          break;
        case "📚 Assignment":
          this.postmessage = this.postmessage.concat(" 📚 Assignment");
          this.post.tags.push("assignment");
          this.tabIndex++;
          break;
        case "💕 Care":
          this.postmessage = this.postmessage.concat(" 💕 Care");
          this.post.tags.push("care");
          this.tabIndex++;
          break;
        case "🙏 Prayer":
          this.postmessage = this.postmessage.concat(" some 🙏 Prayer");
          this.post.tags.push("prayer");
          this.tabIndex++;
          break;
        case "💲 Money":
          this.postmessage = this.postmessage.concat(" some 💲 Money");
          this.post.tags.push("money");
          this.tabIndex++;
          break;
      }
      //   console.log(stage);
    }
  },
  data() {
    return {
      tabIndex: 0,
      postmessage: "👋 Hi",
      post: {
        postmessage: this.postmessage,
        tags: []
      }
    };
  },
  watch: {
    tabIndex() {
      if (this.tabIndex == 0) {
        this.postmessage = "👋 Hi";
      }
      console.log("changed!");
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
