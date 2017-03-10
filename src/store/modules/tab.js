import Vue from 'vue';
import * as types from '../mutation-types';

//const AUTH_JWT_TOKEN = 'auth.jwt_token';
//const AUTH_USER = 'auth.user';
//const AUTH_USER_ID = 'auth.id';
//const AUTH_USER_CONFIGS = 'auth.user_configs';

const localStorage = global.localStorage;
const JSON = global.JSON;

export default {
  state: {
    tabs:[{title:"首页",path:"#/platform/platform_home",class:"active J_menuTab",colsed:false,frameName:"iframe0"}],
  },
  mutations: {
    // Register
    ADD_TAB: (state,tab) => {
      state.tabs.push(tab)
    },
  },
  actions: {
    //add Tab
    addTab({commit}, tab) {
      commit('ADD_TAB', tab);
    }
  },
  getters: {
    getTabs: (state) => state.tabs
  }
};
