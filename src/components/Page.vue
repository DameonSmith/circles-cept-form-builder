<template>
  <div class="page">
    <h2>Page Name: {{ page.name }}</h2>
    <input @keyup="changePageName($event)" type="text">
    <app-section
      v-for="(section, sectionKey) in page.sections"
      :section="section"
      :sectionKey="sectionKey"
      :pageKey="pageKey"
      :key="sectionKey"></app-section>
    <button @click="addSection($event)">Add Section</button>
  </div>
</template>


<script>
import Section from './Section';

export default {
  components: {
    'app-section': Section,
  },
  props: [
    'page',
    'pageKey',
  ],
  computed: {
    pageObj() {
      return this.$store.state.pageObj;
    },
  },
  methods: {
    addSection() {
      const { pageKey } = this;
      this.$store.commit('addSection', { pageKey });
    },
    changePageName(event) {
      const payload = {
        pageKey: this.pageKey,
        newName: event.target.value,
      };
      this.$store.commit('changePageName', payload);
    },
  },
};
</script>


<style>


</style>

