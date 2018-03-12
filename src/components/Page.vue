<template>
  <div class="page">
    <h2>Page Name: {{ page.name }}</h2>
    <input @keyup="changePageName" type="text">
    <button @click="addSection($event)">Add Section</button>
  </div>
</template>


<script>
export default {
  props: [
    'page',
    'pageKey'
  ],
  computed: {
    pageObj() {
      return this.$store.state.pageObj;
    },
  },
  methods: {
    addSection() {
      this.$store.commit('changePage1');
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

