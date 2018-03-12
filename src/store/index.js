import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    pages: {
      'page-1': {
        name: 'income',
        sections: {
          'gross-income': {
            name: 'Gross',
          },
          'net-income': {
            name: 'Net',
          },
        },
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
    addSection(state, { pageKey }) {

      const sections = state.pages[pageKey].sections;
      state.pages[pageKey].sections = Object.assign({}, sections, {
        'new-section': {
          name: 'test',
        },
      });
    },
    changeSectionName(state, { pageKey, sectionKey, newName }) {
      state.pages[pageKey].sections[sectionKey].name = newName;
    },
  },
});

export default store;
