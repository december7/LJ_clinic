import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    show_assist_inquiry: false,
    canEditable: false,
  },
  mutations: {
    WEATHER_SHOW_ASSIST_INQUIRY: (state,  weather_show) => {
      state.show_assist_inquiry=weather_show;
    },

    MSG_EDITABLE: (state, editable) => {
      state.canEditable = editable
    }
  },
  actions: {
    setWeatherShowAssistInquiry ({commit}, weather_show) {
      commit('WEATHER_SHOW_ASSIST_INQUIRY',weather_show);
    },

    setMsgEditable ({commit}, editable) {
      commit('MSG_EDITABLE', editable);
    }
  },
  getters: {
    getWeatherShowAssistInquiry: (state) => state.show_assist_inquiry,
    getMsgEditable: (state) => state.canEditable,
  }
};
