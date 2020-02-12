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
    user_posts: [],
    current_post: {},
    userID: "",
    user: {},
    loading_posts: false
  },
  getters: {
    loading_posts: state => {
      return state.loading_posts;
    },
    POSTS: state => {
      return state.posts;
    },
    USER_POSTS: state => {
      return state.user_posts;
    },
    EVENTS: state => {
      return state.user.Events || [];
    },
    NEW_EVENTS: state => {
      if (!state.user.Events) {
        return [];
      }
      return state.user.Events.filter(event => event.seen) || [];
    },
    USER: state => {
      return state.user || JSON.parse(window.localStorage.getItem("wg_user"));
    },
    USER_ID: state => {
      return (
        state.userID ||
        JSON.parse(window.localStorage.getItem("Sharing")).userID
      );
    },
    CURRENT_POST: state => {
      return state.current_post;
    },
    POST: state => id => {
      return state.posts.find(p => p._id === id);
    },
    USER_POST: state => id => {
      return state.user.Posts.find(p => p._id === id);
    },
    POST_ID: state => id => {
      return state.posts.findIndex(p => p._id === id);
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USER_ID: (state, userID) => {
      state.userID = userID;
    },
    ADD_POST: (state, post) => {
      state.posts.unshift(post);
      // console.log("ADD_POST =>", post);
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    SET_POST: (state, post) => {
      state.current_post = post;
    },
    SET_USER_POSTS: (state, payload) => {
      state.user_posts = payload;
    },
    NEW_EVENT: (state, event) => {
      state.events.unshift(event);
      state.user.Events.unshift(event);
    },
    UPDATE_POST: (state, post) => {
      state.current_post = post;
    },
    ADD_CHAT: (state, chat) => {
      if (state.current_post) {
        state.current_post.chats.push(chat);
      }
    },
    SET_EVENTS: (state, payload) => {
      state.events = payload;
    }
  },
  actions: {
    SET_USER: (context, user) => {
      context.commit("SET_USER", user);
    },
    SET_USER_ID: (context, userID) => {
      context.commit("SET_USER_ID", userID);
    },
    SET_POSTS: async context => {
      context.state.loading_posts = true;
      const { data } = await Axios.get(`${API}/api/posts?pending=true`, {
        withCredentials: true
      });

      context.state.loading_posts = false;

      context.commit("SET_POSTS", data.results);
    },
    FETCH_POST: async (context, options) => {
      const { data } = await Axios.get(
        `${API}/api/posts/${options.id}?withChats=${options.withChats}`,
        {
          withCredentials: true
        }
      );

      context.commit("SET_POST", data.result);
    },
    FETCH_USER_POSTS: async context => {
      let id = context.state.userID;
      if (!context.state.userID) {
        id = JSON.parse(window.localStorage.getItem("Sharing")).userID;
      }
      context.state.loading_posts = true;
      const { data } = await Axios.get(`${API}/api/posts/user/${id}`, {
        withCredentials: true
      });

      context.state.loading_posts = false;

      context.commit("SET_USER_POSTS", data.results);
    },
    FETCH_EVENTS: async context => {
      let userID = context.state.userID;
      if (!context.state.userID) {
        userID = JSON.parse(window.localStorage.getItem("Sharing")).userID;
      }

      const { data } = await Axios.get(`${API}/api/user/${userID}/events`, {
        withCredentials: true
      });

      console.log("User Events", data.results);
      context.commit("SET_EVENTS", data.results);
    },
    FETCH_USER: async context => {
      const userId =
        window.localStorage.getItem("Sharing").userID || context.state.userID;
      const { data } = await Axios.get(`${API}/api/user/${userId}`, {
        withCredentials: true
      });
      context.commit("SET_USER", data.result);
      window.localStorage.setItem("wg_user", JSON.stringify(data.result));
    },
    ADD_POST: (context, post) => {
      context.commit("ADD_POST", post);
    },
    NEW_EVENT: (context, event) => {
      context.commit("NEW_EVENT", event);
    },
    UPDATE_POST: (context, post) => {
      // const index = context.getters.POST_ID(post._id);
      context.commit("UPDATE_POST", post);
    },
    ADD_CHAT: (context, chat) => {
      // let index = context.getters.POST_ID(chat.post);
      // Add chat to current post if possible :)
      context.commit("ADD_CHAT", chat);
    }
  }
});
