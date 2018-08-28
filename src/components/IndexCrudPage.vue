<template>
  <div class="main-div">
    <b-breadcrumb v-bind:items="breadcrumb"/>
    <div v-if="!!newButton.label" class="buttons">
      <b-button variant="primary" class="new-button" v-bind:to="newButton.route">{{newButton.label}}</b-button>
    </div>
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
      },
      newButton: {
        type: Object
      }
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.main-div {
    padding: 10px 10px;
  }
  div.buttons {
    text-align: left;
    padding: 0px 0px 10px 0px;
  }

</style>
