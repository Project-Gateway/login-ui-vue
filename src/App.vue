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
import DatePicker from './components/DatePicker';
import MainHeader from './components/MainHeader';
import MainMenu from './components/MainMenu';
import GoogleMap from './components/GoogleMap';

export default {
  components: {
    DatePicker,
    MainMenu,
    MainHeader,
    GoogleMap
  },
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('identity/retrieveIdentityFromLocalStorage');
  },
  created() {
    this.$store.dispatch('identity/setupLoginApi');
    this.$store.dispatch('identity/retrieveSocialLinks');
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
