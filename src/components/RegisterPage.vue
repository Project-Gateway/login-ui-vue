<template>
  <div>
    <b-breadcrumb v-bind:items="breadcrumb"/>
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
    data() {
      return {
        breadcrumb: ['Register User']
      };
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin: 10px;
}
</style>
