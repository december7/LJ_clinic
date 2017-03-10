import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
const AUTH_ACCESS_TOKEN = 'auth.accessToken';
export default {
  state: {
    todayData:""
  },
  mutations: {
    TODAY_DATA: (state,  todayData ) => {
      state.todayData=todayData;
      // Vue.set(state.todayData, todayData);
    },


  },
  actions: {
    //add Tab
    today_data ({commit}, todayData) {
      commit(types.TODAY_DATA,todayData);
    },
  },
  getters: {
    getToday: (state) => state.todayData,
  }
};
