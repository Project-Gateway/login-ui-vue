<template>
  <div>
    <h2>Register User</h2>
    <register-form></register-form>
  </div>
</template>

<script>
  import RegisterForm from './RegisterForm';

  export default {
    components: {RegisterForm},
    name: 'register-page',
    computed: {
      logged() {
        return this.$store.getters['identity/logged'];
      },
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
