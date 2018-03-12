<template>
  <div class="section">
    <h2>Section Name: {{ section.name }}</h2>
    <input
      @keyup.enter="changeSectionName($event)"
      type="text"
      :value="section.name">
      <div class="section-questions">
        <app-question
          v-for="(question, questionKey) of section.questions"
          :question="question"
          :questionKey="questionKey"
          :sectionKey="sectionKey"
          :pageKey="pageKey"
          :key="questionKey"></app-question>
      </div>
    <button @click="addQuestion($event)">Add Question</button>
  </div>
</template>


<script>
import Question from './Question';

export default {
  components: {
    'app-question': Question,
  },
  props: [
    'section',
    'sectionKey',
    'pageKey',
  ],
  computed: {
    pageObj() {
      return this.$store.state.pageObj;
    },
  },
  methods: {
    addQuestion() {
      const { pageKey, sectionKey } = this;
      this.$store.commit('addQuestion', { pageKey, sectionKey });
    },
    changeSectionName(event) {
      const payload = {
        sectionKey: this.sectionKey,
        pageKey: this.pageKey,
        newName: event.target.value,
      };
      this.$store.commit('changeSectionName', payload);
    },
  },
};
</script>


<style>


</style>

