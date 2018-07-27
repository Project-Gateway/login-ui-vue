<template>
  <login-form v-if="!logged"></login-form>
  <h1 v-else>Logged In!</h1>
</template>

<script>
import LoginForm from './LoginForm';
// import api from '../../helpers/api';

export default {
  components: { LoginForm },
  name: 'home',
  computed: {
    logged() {
      return this.$store.getters['identity/logged'];
    },
  },
  watch: {
    logged(current) {
      if (current) {
        /*
        api.get('auth/me', null, (response) => {
          console.log('response', response.data);
        });
        */
      }
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
