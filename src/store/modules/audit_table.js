import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    auditTableDataTitle: [ ],
    auditTableDataContent:[],
    selectedIndex:0,

  },
  mutations: {
    AUDIT_TABLE_DATA_TITLE: (state,  data ) => {
      state.auditTableDataTitle=data;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },
    AUDIT_TABLE_DATA_CONTENT: (state,  data ) => {
          state.auditTableDataContent=data;
          // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },
    AUDIT_TABLE_SELECTED_INDEX: (state,  index ) => {
          state.selectedIndex=index;
    },


  },
  actions: {
    audit_table_data_title ({commit}, tableData) {
      commit(types.AUDIT_TABLE_DATA_TITLE,tableData);
    },
    audit_table_data_content ({commit}, tableData) {
      commit(types.AUDIT_TABLE_DATA_CONTENT,tableData);
    },
    audit_table_selected_index ({commit}, index) {
      commit(types.AUDIT_TABLE_SELECTED_INDEX,index);
    },
  },
  getters: {
    getTableTitle: (state) => state.auditTableDataTitle,
    getTableContent: (state) => state.auditTableDataContent,
    getSelectedIndex: (state) => state.selectedIndex,
  }
};
