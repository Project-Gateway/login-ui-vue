<template>
  <div id="pub-nub-post">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
    <button v-on:click="push">push</button>
  </div>
</template>
<script>

import GoogleMap from './GoogleMap';

export default {
  name: 'pub-nub-post',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1', this.receptor)
    }
  },
  methods: {
    receptor(msg) {
      msg.message = `sent - ${msg.message}`;
    },
    push() {
      this.$pnPublish(
        {
          channel: 'ch1',
          message: Date.now()
        },
        (status, response) => console.log(status, response)
      );
    },
  },
  mounted() {
    
  },
};
</script>
