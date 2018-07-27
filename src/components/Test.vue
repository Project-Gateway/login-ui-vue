<template>
  <div id="app">
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  computed: {
    count() {
      return this.$store.getters['identity/getCount'];
    },
  },
  methods: {
    increment() {
      this.$store.dispatch('identity/incrementCounter');
    },
    decrement() {
      this.$store.dispatch('identity/decrementCounter');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
