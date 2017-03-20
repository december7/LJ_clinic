import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const sessionStorage = global.sessionStorage;
const JSON = global.JSON;
export default {
  state: {
      //主诉
    chiefComplaint:[],
      //初步诊断
    preliminaryDiagnosis:[],
    },

  mutations: {

    SET_CHIEF_COMPLAINT: (state, chiefComplaint) => {
      state.chiefComplaint = chiefComplaint;
    },

    SET_PRELIMINARY_DIAGNOSIS: (state, preliminaryDiagnosis) => {
      state.preliminaryDiagnosis = preliminaryDiagnosis;
    },

  },

  actions: {

    set_chief_complaint({commit}, chiefComplaint) {
      commit(types.SET_CHIEF_COMPLAINT, chiefComplaint);
    },
    set_preliminary_diagnosis({commit}, preliminaryDiagnosis) {
      commit(types.SET_PRELIMINARY_DIAGNOSIS, preliminaryDiagnosis);
    },

  },

  getters: {
    getChiefComplaint: (state) => state.chiefComplaint,
    getPreliminaryDiagnosis: (state) => state.preliminaryDiagnosis,
  }
};
