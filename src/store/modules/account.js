import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const sessionStorage = global.sessionStorage;
const JSON = global.JSON;
const AUTH_ACCESS_TOKEN = 'auth.accessToken';
const AUTH_ACCESS_USER_OPERATOR_ID = 'auth.operatorId';
export default {
  state: {
    auth: {
      check() {
        return this.accessToken==null?"":this.accessToken;
      },

      accessToken: sessionStorage.getItem(AUTH_ACCESS_TOKEN),
    },
      operatorId: sessionStorage.getItem(AUTH_ACCESS_USER_OPERATOR_ID),
    login: {
      success: false,
      failure: null,
    },
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state,  accessToken ) => {
      if (!accessToken) {
        Vue.set(state.auth, types.ACCESS_TOKEN,"");
        sessionStorage.removeItem(AUTH_ACCESS_TOKEN);
        return;
      }
      Vue.set(state.auth, types.ACCESS_TOKEN,accessToken);
      sessionStorage.setItem(AUTH_ACCESS_TOKEN, accessToken);
    },
    LOGIN_SUBMIT_USER_OPERATOR_ID: (state,  operatorId ) => {
      console.log("LOGIN_SUBMIT_USER_OPERATOR_ID====="+operatorId);
      sessionStorage.setItem(AUTH_ACCESS_USER_OPERATOR_ID, operatorId);
    },

    ACCOUNT_LOGIN_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.login, 'success', true);
    },
  },
  actions: {

    login_submit_success ({commit}, accessToken) {
      commit(types.ACCOUNT_AUTH_STATUS_CHANGED, accessToken);
      commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
    },

    login_submit_user_operator_id ({commit}, userData) {
      commit(types.LOGIN_SUBMIT_USER_OPERATOR_ID, userData);
    },

    logout_submit_success({commit}){
      commit(types.ACCOUNT_AUTH_STATUS_CHANGED,"");
    }
  },
  getters: {
    getOperatorId: (state) => state.operatorId,
    getAccessToken: (state) => state.auth.accessToken,
  }
};
