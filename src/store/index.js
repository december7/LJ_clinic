import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import tab from './modules/tab';
import switch_tab from './modules/switch_tab';
import account from './modules/account';
import pagination from './modules/pagination';
import today from './modules/today';
import medicine_table from './modules/medicine_table';
import audit_table from './modules/audit_table';
import addGoods from './modules/addGoods';
import content_title from './modules/content_title';
import editable from './modules/personal_msg';
import assistInquiry from './modules/assist_inquiry';
import showPhysique from './modules/showPhysique';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tab,
    switch_tab,
    pagination,
    account,
    today,
    medicine_table,
    audit_table,
    addGoods,
    content_title,
    editable,
    assistInquiry,
    showPhysique,
  },
  strict: debug,
});
