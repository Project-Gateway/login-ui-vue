<template>
  <div id="app">
    <b-container>
      <main-header/>
      <main-menu/>
      <slot></slot>
    </b-container>
  </div>
</template>

<script>
  import MainHeader from '../components/MainHeader';
  import MainMenu from '@/navbars/MainMenu';

  export default {
    components: {
      MainMenu,
      MainHeader,
    },
  }
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
