/**
 * Created by xiaoxin on 2017/1/17.
 */
export default {
  state: {
    currentPageNo: 1,
    pageCount: 0,
    secondCount: 0,
    thirdCount: 0,
  },

  mutations: {
    PAGE_COUNT: (state,count) => {
      state.pageCount = count;
    },

    CURRENT_PAGE_NUM: (state, currentNum) => {
      state.currentPageNo = currentNum;
    },

    SECOND_ITEM_COUNT: (state, count) => {
      state.secondCount = count;
    },

    THIRD_ITEM_COUNT: (state, count) => {
      state.thirdCount = count;
    }
  },

  actions: {
    setPageCount({commit}, count) {
      commit('PAGE_COUNT', count);
    },

    setRequestUrl({commit}, url) {
      commit('REQUEST_URL', url);
    },

    setCurrentPageNo({commit}, currentNo) {
      commit('CURRENT_PAGE_NUM', currentNo);
    },

    setSecondItemCount({commit}, count) {
      commit('SECOND_ITEM_COUNT', count);
    },

    setThirdItemCount({commit}, count) {
      commit('THIRD_ITEM_COUNT', count);
    }
  },

  getters: {
    getPageCount: (state) => state.pageCount,
    getCurrentPageNo: (state) => state.currentPageNo,
    getSecondItemCount: (state) => state.secondCount,
    getThirdItemCount: (state) => state.thirdCount,
  }
};
