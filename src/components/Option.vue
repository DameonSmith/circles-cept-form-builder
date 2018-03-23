<template>
  <div class="question">
    <form @submit.prevent="handleSubmit">
      <label>
        Option Label:
        <input type="text" :value="option.label" @change="changeLabel($event)">
      </label>
      <label>
        Option Value:
        <input type="text" :value="option.value" @change="changeValue($event)">
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
export default {
  props: [
    'option',
    'index',
  ],
  data() {
    return {
      label: '',
      value: '',
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        index: this.index,
        option: { label: this.label, value: this.value },
      };
      this.$emit('optionChange', payload);
    },
    changeValue(event) {
      this.value = event.target.value;
    },
    changeLabel(event) {
      this.label = event.target.value;
    },
  },
};
</script>


<style>


</style>

