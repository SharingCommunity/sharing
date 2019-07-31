import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Axios.defaults.withCredentials = true;

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
    },
    ADD_EVENT: (state, event) => {
      state.events.push(event);
    }
  },
  actions: {
    SET_POSTS: async context => {
      let { data } = await Axios.get("http://localhost:3000/api/posts");
      console.log(data);
      context.commit("SET_POSTS", data);
    },
    ADD_POST: (context, post) => {
      context.commit("ADD_MY_POST", post);
    },
    ADD_NEW_POST: (context, post) => {
      context.commit("ADD_POST", post);
    },
    ADD_EVENT: (context, event) => {
      context.commit("NEW_EVENT", event);
    }
  }
});
