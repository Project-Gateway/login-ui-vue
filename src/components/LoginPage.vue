<template>
  <div>
    <b-breadcrumb v-bind:items="breadcrumb"/>
    <login-form></login-form>
  </div>
</template>

<script>
  import LoginForm from './LoginForm.vue';

  export default {
    components: {
      LoginForm,
    },
    name: 'login-page',
    data() {
      return {
        breadcrumb: ['Login']
      };
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin: 5px;
}
</style>
