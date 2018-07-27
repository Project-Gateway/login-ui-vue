<template>
  <div>
    <p v-if="logged">Redirecting</p>
    <div v-else-if="error">
      <b-alert show dismissible variant="danger" v-on:dismissed="errorDismissed">
        {{ error }}
      </b-alert>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import api from '../helpers/api';

export default {
  name: 'oauth',
  data() {
    return {
      error: null,
    };
  },
  props: ['provider', 'query'],
  computed: {
    logged() {
      return this.$store.getters['identity/logged'];
    },
  },
  watch: {
    logged(current) {
      if (current) {
        this.error = null;
        this.$router.push('/');
      }
    },
  },
  methods: {
    errorDismissed() {
      this.$router.push('/');
    },
  },
  mounted() {
    const params = this.query;
    params.redirectUri = this.$store.getters['identity/socialReturnUrl'](this.provider);
    api.get(`auth/login/${this.provider}`, params,
      (response) => {
        this.$store.dispatch('identity/logUser', response.data);
      },
      ({ response }) => {
        this.error = response.data.message;
      },
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
