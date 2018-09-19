<template>
  <div style="margin: auto; padding: 20px; width: 500px;">
    <b-form v-on:submit.prevent="submit" novalidate>
      <b-form-group id="email"
                    label="Email:"
                    label-for="email-input">
        <b-form-input id="email-input"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
        <b-form-invalid-feedback id="inputLiveFeedback">
          Invalid message
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="password"
                    label="Password:"
                    label-for="password-input">
        <b-form-input id="password-input"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
      <b-alert dismissible variant="danger" v-bind:show="!!error" v-on:dismissed="error=null">
        {{ error }}
      </b-alert>
      <b-button type="submit" variant="success">Register</b-button>
    </b-form>

    <separator>Or connect with</separator>
    <div class="social-login-container">
      <b-button class="btn-social btn-facebook"
                v-bind:href="facebookUrl"
                v-bind:disabled="!facebookUrl">
        <i class="fa fa-facebook"></i> Facebook
      </b-button>
      <b-button class="btn-social btn-google"
                v-bind:href="googleUrl"
                v-bind:disabled="!googleUrl">
        <i class="fa fa-google"></i> Google
      </b-button>
      <b-button class="btn-social btn-twitter"
                v-bind:href="twitterUrl"
                v-bind:disabled="!twitterUrl">
        <i class="fa fa-twitter"></i> Twitter
      </b-button>
    </div>
  </div>
</template>

<script>
import Separator from './widgets/Separator';

export default {
  components: { Separator },
  name: 'register-form',
  props: ['query'],
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
    };
  },
  computed: {
    socialUrls() {
      return this.$store.getters['identity/socialUrls'];
    },
    facebookUrl() {
      return this.socialUrls === null ? '' : this.socialUrls.facebook;
    },
    googleUrl() {
      return this.socialUrls === null ? '' : this.socialUrls.google;
    },
    twitterUrl() {
      return this.socialUrls === null ? '' : this.socialUrls.twitter;
    },
    logged() {
      return this.$store.getters['identity/logged'] ? 'Logado!' : 'Deslogado!';
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('identity/register', {email: this.form.email, password: this.form.password}).then(() => {
        //console.log('logged');
      }).catch(({response}) => {
        this.error = response.data.message;
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.social-login-container {
    text-align: center;
  }
</style>
