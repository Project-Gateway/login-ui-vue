<template>
  <div v-if="!logged">
    <h2>Guest Homepage</h2>
  </div>
  <dashboard v-else-if="role == 'customer'"></dashboard>
  <internal-dashboard v-else></internal-dashboard>
</template>

<script>
import Dashboard from '@/components/Dashboard';
import InternalDashboard from '@/components/InternalDashboard';

export default {
  name: 'home',
  components: {
    Dashboard,
    InternalDashboard,
  },
  computed: {
    logged() {
      return this.$store.getters['logged'];
    },
    role() {
      return this.$store.state.role;
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
