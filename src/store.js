import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import API from "./config.js";

Axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    events: [],
    user: "",
    loading_posts: false
  },
  getters: {
    loading_posts: state => {
      return state.loading_posts;
    },
    POSTS: state => {
      return state.posts;
    },
    EVENTS: state => {
      return state.events;
    },
    USER: state => {
      return state.user;
    },
    POST: state => id => {
      return state.posts.find(p => p._id === id);
    },
    POST_ID: state => id => {
      return state.posts.findIndex(p => p._id === id);
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERNAME: (state, data) => {
      state.user.username = data.username;
      state.user._id = data._id;
    },
    ADD_POST: (state, post) => {
      state.posts.unshift(post);
      // console.log("ADD_POST =>", post);
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    NEW_EVENT: (state, event) => {
      state.events.unshift(event);
    },
    UPDATE_POST: (state, payload) => {
      Vue.set(state.posts, payload.index, payload.post);
      // state.posts[payload.index] = payload.post;
    },
    ADD_CHAT: (state, payload) => {
      state.posts[payload.index].chats.push(payload.chat);
    },
    SET_EVENTS: (state, payload) => {
      state.events = payload;
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
      context.state.loading_posts = true;
      const { data } = await Axios.get(`${API}/api/posts`, {
        withCredentials: true
      });

      context.state.loading_posts = false;

      context.commit("SET_POSTS", data.results);
    },
    FETCH_EVENTS: async context => {
      let userID = context.state.user;
      console.log("userID =>", context.state.user);
      if (!context.state.user) {
        userID = JSON.parse(window.localStorage.getItem("Sharing")).userID;
      }

      const { data } = await Axios.get(`${API}/api/user/${userID}/events`, {
        withCredentials: true
      });

      console.log("User Events", data.results);
      context.commit("SET_EVENTS", data.results);
    },
    GET_USER: async context => {
      const { data } = await Axios.get(
        `${API}/api/user/${context.state.user}`,
        {
          withCredentials: true
        }
      );
      console.log("data =>", data.results);
      context.commit("SET_USER", data.results);
    },
    ADD_POST: (context, post) => {
      context.commit("ADD_POST", post);
    },
    NEW_EVENT: (context, event) => {
      context.commit("NEW_EVENT", event);
    },
    UPDATE_POST: (context, post) => {
      const index = context.getters.POST_ID(post._id);
      context.commit("UPDATE_POST", { index, post });
    },
    ADD_CHAT: (context, chat) => {
      let index = context.getters.POST_ID(chat.post);
      context.commit("ADD_CHAT", { index, chat });
    }
  }
});
