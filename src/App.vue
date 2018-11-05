<template>
    <component :is="layout">
      <router-view></router-view>
    </component>
</template>

<script>
import DatePicker from './components/DatePicker';
import GoogleMap from './components/GoogleMap';

const default_layout = 'default';

export default {
  name: 'app',
  computed: {
    layout() {
      return ['admin', 'professional'].includes(this.$store.state.role) ? 'admin-layout' : 'default-layout';
    }
  },
  created() {
//    this.$store.dispatch('identity/setupLoginApi');
//    this.$store.dispatch('identity/retrieveSocialLinks');
  },
};
</script>

<style>

</style>
