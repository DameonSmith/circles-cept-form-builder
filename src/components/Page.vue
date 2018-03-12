<template>
  <div class="page">
    <h2>Page Name: {{ page.name }}</h2>
    <button v-on:click="addSection">button</button>
  </div>
</template>


<script>
export default {
  props: [
    'page',
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
  },
};
</script>


 <style>


</style>

