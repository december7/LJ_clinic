import * as types from '../mutation-types';
// / 引用API文件
import Vue from 'vue';

const localStorage = global.localStorage;
const sessionStorage = global.sessionStorage;
const JSON = global.JSON;
export default {
  state: {

      template: [],
    //1.治疗,2西药,3,中药,4其他项目
      templateType: "",
    },

  mutations: {

    SET_TEMPLATE_CONTENT: (state, template) => {
      state.template = template;
    },

    SET_TEMPLATE_CONTENT_TYPE: (state, templateType) => {
      state.templateType = templateType;
    },

  },

  actions: {

    setTemplateContent({commit}, template) {
      commit(types.SET_TEMPLATE_CONTENT, template);
    },
    setTemplateContentType({commit}, templateType) {
      commit(types.SET_TEMPLATE_CONTENT_TYPE, templateType);
    },

  },

  getters: {
    getTemplateContent: (state) => state.template,
    getTemplateType: (state) => state.templateType,
  }
};
