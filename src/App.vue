<template>
  <div id="app">
    <b-container>
      <main-header/>
      <main-menu/>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader';
import MainMenu from './components/MainMenu';
import GoogleMap from './components/GoogleMap';

export default {
  components: {
    MainMenu,
    MainHeader,
    GoogleMap
  },
  name: 'App',
  created() {
    this.$store.dispatch('identity/retrieveIdentityFromLocalStorage');
    this.$store.dispatch('identity/retrieveSocialLinks');
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
