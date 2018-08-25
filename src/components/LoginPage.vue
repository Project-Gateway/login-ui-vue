<template>
  <div>
    <h2>Log In:</h2>
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
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
