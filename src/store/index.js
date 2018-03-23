import Vue from 'vue';
import Vuex from 'vuex';
import QUESTION from './actions/questions';

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

const makeNewKey = oldKey => oldKey.toLowerCase().replace(/ /g, '-');

const store = new Vuex.Store({
  strict: true,
  state: {
    pages: {
      'page-1': {
        name: 'income',
        sections: {
          gross: {
            name: 'Gross Income',
            questions: {},
          },
          'net-income': {
            name: 'Net Income',
            questions: {},
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
      const newKey = makeNewKey(newName);

      state.pages =
        reassignKeyAndName(pages, pageKey, newKey, newName, 'name');
    },
    addSection(state, { pageKey }) {
      const sections = state.pages[pageKey].sections;
      state.pages[pageKey].sections = Object.assign({}, sections, {
        'new-section': {
          name: 'New Section',
          questions: {},
        },
      });
    },
    changeSectionName(state, { pageKey, sectionKey, newName }) {
      const sections = state.pages[pageKey].sections;
      const newKey = makeNewKey(newName);

      state.pages[pageKey].sections =
        reassignKeyAndName(sections, sectionKey, newKey, newName, 'name');
    },
    addQuestion(state, { pageKey, sectionKey }) {
      const questions = state.pages[pageKey].sections[sectionKey].questions;

      state.pages[pageKey].sections[sectionKey].questions =
        Object.assign({}, questions, {
          'new-question': {
            label: 'New Question',
            value: '',
            type: 'text',
          },
        });
    },
    [QUESTION.CHANGE_LABEL]: (state, { pageKey, sectionKey, questionKey, newLabel }) => {
      const questions = state.pages[pageKey].sections[sectionKey].questions;
      const newKey = makeNewKey(newLabel);

      state.pages[pageKey].sections[sectionKey].questions =
        reassignKeyAndName(questions, questionKey, newKey, newLabel, 'label');
    },
    [QUESTION.CHANGE_TYPE]: (state, { pageKey, sectionKey, questionKey, newType }) => {
      state.pages[pageKey].sections[sectionKey].questions[questionKey].type = newType;
    },
  },
});

export default store;
