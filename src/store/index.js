import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    pages: {
      'page-1': {
        name: 'income',
      },
    },
  },
  mutations: {
    changePage1(state) {
      state.pages['page-1'].name = 'A thing';
    },
    changePageName(state, { pageKey, newName }) {
      state.pages[pageKey].name = newName;
    },
  },
});

export default store;
