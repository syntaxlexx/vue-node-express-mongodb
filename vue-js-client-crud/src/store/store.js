import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/* eslint-disable */
export default new Vuex.Store({
  state: {
    isSidebarActive: false,
    themeColor: "#2962ff",
    user: null,
  },

  mutations: {
  	// This is for Sidebar trigger in mobile
  	IS_SIDEBAR_ACTIVE(state, value) {
        state.isSidebarActive = value;
    },
  },

  actions: {
  
  },

  getters:{
  
  }
})
