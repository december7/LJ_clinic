/**
 * Created by Raining on 2017/3/8.
 */
import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    registeredOrdId: "",
  },
  mutations: {
    SHOW_REGISTEREDORDID: (state,  registeredOrdId ) => {
      state.registeredOrdId = registeredOrdId;
    },
  },
  actions: {
    show_registeredOrdId ({commit}, registeredOrdId) {
      commit('SHOW_REGISTEREDORDID',registeredOrdId);
    },
  },
  getters: {
    getRegisteredOrdId: (state) => state.registeredOrdId,
  }
};
