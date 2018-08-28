<template>
  <div v-if="!logged">
    <h2>Guest Homepage</h2>
  </div>
  <div v-else>
    <h2>Logged Homepage</h2>
  </div>
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
div {
  text-align: center;
}
</style>
