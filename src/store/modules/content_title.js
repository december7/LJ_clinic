/**
 * Created by xiaoxin on 2017/2/17.
 */
export default{
  state:{
    showSearchView: false,
  },

  mutations:{

    SHOW_SEARCH_VIEW: (state, weatherShow) => {
      state.showSearchView = weatherShow;
    },
  },

  actions:{
    showSearchView({commit}, weatherShow) {
      commit('SHOW_SEARCH_VIEW', weatherShow);
    },
  },

  getters: {
    weatherShowSearchView: (state) => state.showSearchView,
  }
}
