import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const JSON = global.JSON;
export default {
  state: {
    userData: "",
    phisicalData:"",
    chargeData:"",
    isChargeData : "",
    ostockType: "",
    ostockId: "",
  },
  mutations: {
    SHOW_PHYSIQUE_USER_DATA: (state,  data ) => {
      state.userData=data;
    },
    SHOW_PHISICAL_DATA: (state,  phisicalData ) => {
      state.phisicalData=phisicalData;
    },
    SHOW_CHARGE_DATA: (state, data) => {
      state.chargeData = data;
    },
    IS_CHARGE_DATA: (state, data) => {
      state.isChargeData = data;
    },
    SHOW_STOCK_OSTOCKTYPE: (state, data) => {
      state.ostockType = data;
    },
    SHOW_STOCK_OSTOCKID: (state, data) => {
      state.ostockId = data;
    },
  },
  actions: {
    show_physique_user_data ({commit}, tableData) {
      commit(types.SHOW_PHYSIQUE_USER_DATA,tableData);
    },
    show_phisical_data ({commit}, phisicalData) {
      commit(types.SHOW_PHISICAL_DATA,phisicalData);
    },
    show_charge_data ({commit}, chargeData) {
      commit(types.SHOW_CHARGE_DATA,chargeData);
    },
    is_charge_data ({commit}, isChargeData) {
      commit(types.IS_CHARGE_DATA,isChargeData);
    },
    show_stock_ostocktype ({commit}, ostockType) {
      commit(types.SHOW_STOCK_OSTOCKTYPE,ostockType);
    },
    show_stock_ostockid ({commit}, ostockId) {
      commit(types.SHOW_STOCK_OSTOCKID,ostockId);
    },
  },
  getters: {
    getUserData: (state) => state.userData,
    getPhysicalData: (state) => state.phisicalData,
    getChargeData: (state) => state.chargeData,
    getIsChargeData: (state) => state.isChargeData,
    getOstockType: (state) => state.ostockType,
    getOstockId: (state) => state.ostockId,
  }
};
