import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    tableData: [

    ]
  },
  mutations: {
    MEDICINE_TABLE_DATA: (state,  tableData ) => {
      state.tableData=tableData;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },


  },
  actions: {
    //add Tab
    medicine_table_data ({commit}, tableData) {

      commit(types.MEDICINE_TABLE_DATA,tableData);
    },
  },
  getters: {
    getMedicineTable: (state) => state.tableData,
  }
};
