<template>
  <div>
    <b-breadcrumb v-bind:items="breadcrumb"/>
    <base-remote-grid v-if="remote" v-bind="gridConfig"></base-remote-grid>
    <base-grid v-else v-bind="gridConfig"></base-grid>

  </div>
</template>

<script>
  import BaseGrid from './BaseGrid.vue';
  import BaseRemoteGrid from './BaseRemoteGrid.vue';

  export default {
    components: {
      BaseGrid,
      BaseRemoteGrid,
    },
    data() {
      return {
        gridConfig: this.indexConfig
      };
    },
    props: {
      breadcrumb: {
        type: Array
      },
      indexConfig: {
        type: Object,
        required: true,
      },
      remote: {
        'default': false
      }
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    padding: 30px 10px;
  }
</style>
