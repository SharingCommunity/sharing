import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    events: [],
    user: ""
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
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    ADD_EVENT: (state, event) => {
      state.events.unshift(event);
    },
    UPDATE_POST: (state, payload) => {
      state[payload.index] = payload.post;
    },
    ADD_CHAT: (state, payload) => {
      state[payload.index].chats.push(payload.chat);
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
      const { data } = await Axios.get("http://10.3.91.21:3000/api/posts", {
        withCredentials: true
      });
      // console.log(Axios.get("http://10.3.91.21:3000/api/posts", {
      //   withCredentials: true
      // }).response);
      console.log("data =>", data.results);
      context.commit("SET_POSTS", data.results);
    },
    GET_USER: async context => {
      const { data } = await Axios.get(
        `http://10.3.91.21:3000/api/user/${context.state.user._id}`,
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
    ADD_EVENT: (context, event) => {
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
