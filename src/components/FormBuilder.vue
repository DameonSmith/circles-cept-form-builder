<template>
  <div class="form-builder">
    <page-wrapper ></page-wrapper>


    {{ pages }}

    <button v-on:click="changePage">Change Page 1</button>
  </div>
</template>


<script>
import PageWrapper from './PageWrapper';

export default {
  components: {
    'page-wrapper': PageWrapper,
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
  },
  methods: {
    changePage() {
      this.$store.commit('changePage1');
    },
  },
};
</script>


 <style>


</style>

