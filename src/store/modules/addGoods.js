import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    goodsData: "",
    selectGoods:[],
    compileSuppliersNo:"",
    compileUserId:"",
  },
  mutations: {
    MEDICINE_ADD_GOODS: (state,  tableData ) => {
      state.goodsData=tableData;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },
    MEDICINE_SELECT_GOODS: (state,  selectGoods ) => {
      state.selectGoods.push(selectGoods);
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },
    MEDICINE_SELECT_DELETE_GOODS: (state,  index ) => {
      state.selectGoods.splice(index, 1);
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },
    MEDICINE_COMPILE_SUPPLIERS_NO: (state,  compileSuppliersNo ) => {
      state.compileSuppliersNo=  compileSuppliersNo;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    }, MEDICINE_COMPILE_USER_ID: (state,  compileUserId ) => {
      state.compileUserId=  compileUserId;
      // Vue.set(state.tableData, types.MEDICINE_TABLE, tableData);
    },


  },
  actions: {
    //add Tab
    medicine_add_goods ({commit}, tableData) {
      commit(types.MEDICINE_ADD_GOODS,tableData);
    },
    medicine_select_goods ({commit}, tableData) {
      commit(types.MEDICINE_SELECT_GOODS,tableData);
    },
    medicine_select_delete_goods ({commit}, index) {
      commit(types.MEDICINE_SELECT_DELETE_GOODS,index);
    } ,
    medicine_compile_suppliers_no ({commit}, compileSuppliersNo) {
      commit(types.MEDICINE_COMPILE_SUPPLIERS_NO,compileSuppliersNo);
    },
    medicine_compile_user_id ({commit}, compileUserId) {
      commit(types.MEDICINE_COMPILE_USER_ID,compileUserId);
    },
  },
  getters: {
    getAddGoods: (state) => state.goodsData,
    getSelectGoods: (state) => state.selectGoods,
    getCompileSuppliersNo: (state) => state.compileSuppliersNo,
    getCompileUserId: (state) => state.compileUserId,
  }
};
