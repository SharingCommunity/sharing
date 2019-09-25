import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    events: [],
    user: {
      username: "",
      posts: []
    }
  },
  getters: {
    POSTS: state => {
      return state.posts;
    },
    EVENTS: state => {
      return state.events;
    },
    USER: state => {
      return state.user;
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERNAME: (state, username) => {
      state.user.username = username;
    },
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
    SET_USER: (context, user) => {
      context.commit("SET_USER", user);
    },
    SET_USERNAME: (context, username) => {
      context.commit("SET_USERNAME", username);
    },
    SET_POSTS: async context => {
      const { data } = await Axios.get("http://localhost:3000/api/posts", {
        withCredentials: true
      });

      // console.log(Axios.get("http://localhost:3000/api/posts", {
      //   withCredentials: true
      // }).response);
      console.log("data =>", data.results);
      context.commit("SET_POSTS", data.results);
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
