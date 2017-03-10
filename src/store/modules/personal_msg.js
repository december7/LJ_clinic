import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    editable: false,
  },
  mutations: {
    SET_EDITABLE: (state,  editable ) => {
      state.editable=editable;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },


  },
  actions: {
    //
    setEditable ({commit}, editable) {

      commit('SET_EDITABLE',editable);
    },
  },
  getters: {
    getEditable: (state) => state.editable,
  }
};
