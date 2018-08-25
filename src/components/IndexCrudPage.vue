<template>
  <div>
    <b-breadcrumb v-bind:items="breadcrumb"/>
    <base-grid v-bind="gridConfig"></base-grid>

  </div>
</template>

<script>
  import BaseGrid from './BaseGrid.vue';

  export default {
    components: {
      BaseGrid,
    },
    data() {
      return {
        gridConfig: {
          apiRoute: '/users/paginated',
          columnsConfig: [
            {name: 'email', title: 'Email'},
            {name: 'created_at', title: 'Created'},
            {name: 'updated_at', title: 'Updated'},
          ],
          rowsCallback: ({emails, ...rest}) => ({
            email: `${emails.shift().email} ` + (emails.length ? `+${emails.length}` : ''),
            ...rest
          }),
        },
      };
    },
    props: ['breadcrumb'],
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    padding: 30px 10px;
  }
</style>
