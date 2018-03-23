<template>
  <div class="question">
    <h2>Question Name: {{ question.label }}</h2>
    <input
      @keyup.enter="changeQuestionLabel($event)"
      type="text"
      :value="question.label">

    <h6>Question Description: {{ question.description }}</h6>
    <input
      @keyup.enter="changeQuestionDescription($event)"
      type="text"
      :value="question.description">
      <select
        @change="changeType($event)"
        :value="question.type">
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="select">Select</option>
        <option value="radio">Radio</option>
      </select>
      <div
        v-if="question.type === 'select'"
        class="select">
        <app-option
          v-for="(option, index) of question.options"
          v-on:optionChange="handleOptionChange"
          :option="option"
          :index="index"
          :key="index"></app-option>
        <button @click="addOption">Add Option</button>
      </div>
      <div
        v-if="question.type === 'radio'"
        class="radio">
        IS RADIO
      </div>
  </div>
</template>


<script>
import QUESTION from '../store/actions/questions';
import Option from './Option';

export default {
  components: {
    'app-option': Option,
  },
  props: [
    'question',
    'questionKey',
    'sectionKey',
    'pageKey',
  ],
  computed: {
    pageObj() {
      return this.$store.state.pageObj;
    },
  },
  methods: {
    changeType(event) {
      const payload = {
        pageKey: this.pageKey,
        sectionKey: this.sectionKey,
        questionKey: this.questionKey,
        newType: event.target.value,
      };

      this.$store.commit(QUESTION.CHANGE_TYPE, payload);
    },
    addOption() {
      const payload = {
        pageKey: this.pageKey,
        sectionKey: this.sectionKey,
        questionKey: this.questionKey,
        newOption: { label: 'New Option', value: 'new-val' },
      };
      this.$store.commit(QUESTION.ADD_OPTION, payload);
    },
    changeQuestionLabel(event) {
      const payload = {
        pageKey: this.pageKey,
        sectionKey: this.sectionKey,
        questionKey: this.questionKey,
        newLabel: event.target.value,
      };
      this.$store.commit(QUESTION.CHANGE_LABEL, payload);
    },
    changeQuestionDescription(event) {
      const payload = {
        pageKey: this.pageKey,
        sectionKey: this.sectionKey,
        questionKey: this.questionKey,
        newDescription: event.target.value,
      };
      this.$store.commit(QUESTION.CHANGE_DESCRIPTION, payload);
    },
    handleOptionChange(value) {
      const payload = {
        pageKey: this.pageKey,
        sectionKey: this.sectionKey,
        questionKey: this.questionKey,
        changedOption: value,
      };

      this.$store.commit(QUESTION.CHANGE_OPTION, payload);
    },
  },
};
</script>


<style>


</style>

