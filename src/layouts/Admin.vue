<template>
  <div>
    <admin-main-menu></admin-main-menu>
    <b-container fluid id="container">
      <b-row>
        <b-col cols="2" id="side-menu">
          <admin-vertical-menu></admin-vertical-menu>
        </b-col>
        <b-col cols="10">
          <slot></slot>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import AdminMainMenu from "../navbars/AdminMainMenu";
  import AdminVerticalMenu from "../navbars/AdminVerticalMenu";

  export default {
    components: {
      AdminMainMenu,
      AdminVerticalMenu
    }
  }
</script>

<style scoped>
  #container {
    padding-top: 15px;
  }
  #side-menu {
    border-right: 2px black solid;
  }
</style>
