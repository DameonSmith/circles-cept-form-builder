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
            description: 'description',
          },
        });
    },

    [QUESTION.CHANGE_LABEL]: (state, payload) => {
      const { pageKey, sectionKey, questionKey, newLabel } = payload;
      const newKey = makeNewKey(newLabel);
      const questions = state.pages[pageKey].sections[sectionKey].questions;

      state.pages[pageKey].sections[sectionKey].questions =
        reassignKeyAndName(questions, questionKey, newKey, newLabel, 'label');
    },

    [QUESTION.CHANGE_TYPE]: (state, payload) => {
      const { pageKey, sectionKey, questionKey, newType } = payload;
      const question = state.pages[pageKey].sections[sectionKey].questions[questionKey];
      question.type = newType;
      if (newType === 'radio' || newType === 'select') {
        Vue.set(
          question,
          'options',
          []);
      }
    },

    [QUESTION.CHANGE_DESCRIPTION]: (state, payload) => {
      const { pageKey, sectionKey, questionKey, newDescription } = payload;
      state.pages[pageKey].sections[sectionKey].questions[questionKey].description = newDescription;
    },

    [QUESTION.ADD_OPTION]: (state, payload) => {
      const { pageKey, sectionKey, questionKey, newOption } = payload;
      const question = state.pages[pageKey].sections[sectionKey].questions[questionKey];
      if (question.type === 'radio' || question.type === 'select') {
        question.options.push(newOption);
      }
    },

    [QUESTION.CHANGE_OPTION]: (state, payload) => {
      const { pageKey, sectionKey, questionKey, changedOption } = payload;
      const question = state.pages[pageKey].sections[sectionKey].questions[questionKey];
      if (question.type === 'radio' || question.type === 'select') {
        question.options = question.options.map((option, index) => {
          if (index === changedOption.index) {
            return changedOption.option;
          }
          return option;
        });
      }
    },
  },
});

export default store;
