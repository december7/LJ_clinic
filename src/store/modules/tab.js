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
    tabs:[ ],
    homeLeftTabs:[],

  },
  mutations: {
    // Register
    ADD_TAB: (state,tab) => {
      state.tabs.push(tab)
    },
    ADD_HOME_LEFT_TABS: (state,homeLeftTabs) => {
      state.homeLeftTabs=homeLeftTabs;
    },
    RESET_TAB: (state,tab) => {
      state.tabs=[tab];
    },
  },
  actions: {
    //add Tab
    addTab({commit}, tab) {
      commit('ADD_TAB', tab);
    },
    reset_tab({commit}, tab) {
      commit('RESET_TAB', tab);
    },
    add_home_left_tabs({commit}, tab) {
      commit(types.ADD_HOME_LEFT_TABS, tab);
    },
  },
  getters: {
    getTabs: (state) => state.tabs,
    getHomeLeftTabs: (state) => state.homeLeftTabs
  }
};
