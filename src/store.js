import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    events: []
  },
  getters: {
    POSTS: state => {
      return state.posts;
    },
    EVENTS: state => {
      return state.events;
    }
  },
  mutations: {
    ADD_POST: (state, post) => {
      state.posts.push(post);
    },
    ADD_MY_POST: (state, post) => {
      state.posts.push(post);
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    }
  },
  actions: {
    SET_POSTS: async context => {
      let { data } = await Axios.get("http://localhost:3000/posts");
      console.log(data);
      context.commit("SET_POSTS", data);
    },
    ADD_POST: (context, post) => {
      context.commit("ADD_MY_POST", post);
    },
    ADD_NEW_POST: (context, post) => {
      context.commit("ADD_POST", post);
    }
  }
});
