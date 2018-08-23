<template>
  <div id="pub-nub-view">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'pub-nub-view',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1', this.receptor),
    },
  },
  methods: {
    receptor(msg) {
      msg.message = `sent - ${msg.message}`;
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
