import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    ADD_MESSAGE(state, message){
      state.messages.push(message)
    }
  },
  actions: {
    ADD_MESSAGE(context,message){
      context.commit('ADD_MESSAGE',message);
    }
  },
  getters: {
    messages: state => state.messages
  }
})
