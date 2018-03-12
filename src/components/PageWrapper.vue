<template>
  <div class="page-wrapper">
    <div class="tab-body">
      <h1>Page Wrapper Thing</h1>
    </div>
    <div class="pages">
      <pageForm
        v-for="page in pages"
        :page="page"
        :key="page.name"></pageForm>
    </div>


  </div>
</template>


<script>
import Page from './Page';

export default {
  computed: {
    pages() {
      return this.$store.state.pages;
    },
  },
  components: {
    pageForm: Page,
  },
};
</script>


<style>

</style>

