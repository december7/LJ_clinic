/**
 *
 * Created by xiaoxin on 2017/1/17.
 */

export default {
  state:{
    switch_tabs:[],
    select_states:[],
    currentIndex:0,
    right_show: false,
    listCountShow: false,
    currentItem: 0,
  },

  mutations:{
    ADD_SWITCH_TAB: (state,tabs) => {
      state.switch_tabs = tabs;

    },

    CHANGE_TAB_STATE: (state, index) => {
      for (var i = 0; i < state.switch_tabs.length; i++) {
        state.switch_tabs[i].selected = false;
      }

      state.switch_tabs[index].selected = true;
      state.currentIndex = index;
     },

    RIGHT_SHOW: (state, weatherShow) => {
      state.right_show = weatherShow;
    },

    SELECT_NAME: (state, selectNames) => {
      state.select_states = selectNames;
    },

    CURRENT_ITEM: (state, currentItem) => {
      state.currentItem = currentItem;
    },

    CHANGE_TITLE_COUNT: (state, counts) => {
      for (var i = 0; i < state.switch_tabs.length; i++) {
        state.switch_tabs[i].listCount = counts[i];
      }

    },

    LIST_COUNT_SHOW: (state, weatherShow) => {
      state.listCountShow = weatherShow;
    }

  },

  actions: {
    //add Tab
    addSwitchTabs({commit}, tabs) {
      commit('ADD_SWITCH_TAB', tabs);
    },

    addSelectStates({commit}, selectNames) {
      commit('SELECT_NAME', selectNames);
    },

    changeTabState({commit}, index) {
      commit('CHANGE_TAB_STATE', index);
    },

    showRightSearch({commit}, show){
      commit("RIGHT_SHOW", show);
    },

    setCurrentItem({commit}, currentItem) {
      commit('CURRENT_ITEM', currentItem);
    },

    changeTitleCount({commit}, counts) {
      commit('CHANGE_TITLE_COUNT', counts);
    },

    showListCount({commit}, weatherShow) {
      commit('LIST_COUNT_SHOW', weatherShow);
    }

  },
  getters: {
    getSwitchTabs: (state) => state.switch_tabs,
    getSelectStates: (state) => state.select_states,
    getCurrentIndex: (state) => state.currentIndex,
    weatherShowRight:(state) => state.right_show,
    getCurrentItem: (state) => state.currentItem,
    weatherShowListCount: (state) => state.listCountShow,
  }
}
