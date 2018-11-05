<template>
  <b-navbar-nav class="ml-auto">

    <b-nav-item v-if="!logged">
      <router-link to="/login">Log In</router-link>
    </b-nav-item>
    <b-nav-item v-if="!logged">
      <router-link to="/register">Sign Up</router-link>
    </b-nav-item>
    <b-nav-item-dropdown v-if="logged" right>
      <!-- Using button-content slot -->
      <template slot="button-content">
        {{ mainEmail }}
      </template>
      <b-dropdown-item v-on:click="logout">
        Log Out
      </b-dropdown-item>
    </b-nav-item-dropdown>

  </b-navbar-nav>
</template>

<script>
  export default {
    name: 'user-menu',
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/');
        });
      },
    },
    computed: {
      logged() {
        return this.$store.getters['logged'];
      },
      mainEmail() {
        return this.$store.state.emails[0];
      },
    },
  }
</script>
