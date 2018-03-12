import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const reassignKeyAndName =
  (oldObject, oldKey, newKey, newName, newNameKey) => {
    const newObject = {};

    Object.keys(oldObject).forEach((key) => {
      if (key === oldKey) {
        newObject[newKey] = {
          ...oldObject[key],
          [newNameKey]: newName,
        };
      } else {
        newObject[key] = oldObject[key];
      }
    });

    return newObject;
  };

const store = new Vuex.Store({
  strict: true,
  state: {
    pages: {
      'page-1': {
        name: 'income',
        sections: {
          gross: {
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
      const pages = state.pages;
      const newKey = newName.toLowerCase().replace(' ', '-');

      state.pages =
        reassignKeyAndName(pages, pageKey, newKey, newName, 'name');
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
      const sections = state.pages[pageKey].sections;
      const newKey = newName.toLowerCase().replace(' ', '-');

      state.pages[pageKey].sections =
        reassignKeyAndName(sections, sectionKey, newKey, newName, 'name');
    },
  },
});

export default store;
