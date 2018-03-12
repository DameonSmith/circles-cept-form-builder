<template>
  <div class="section">
    <h2>Section Name: {{ section.name }}</h2>
    <input
      @keyup.enter="changeSectionName($event)"
      type="text"
      :value="section.name">
    <button @click="addQuestion($event)">Add Section</button>
  </div>
</template>


<script>
export default {
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

