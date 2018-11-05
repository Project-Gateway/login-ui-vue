<template>
  <b-navbar toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item
                v-for="item in leftItems"
                v-if="show(item)"
                v-bind:exact="item.exact"
                v-bind:to="item.path"
        >
          {{ item.label }}
        </b-nav-item>
      </b-navbar-nav>

      <user-menu></user-menu>

    </b-collapse>
  </b-navbar>

</template>

<script>
  import UserMenu from '@/navbars/UserMenu';

  export default {
    name: 'main-menu',
    components: {
      UserMenu,
    },
    data() {
      return {
        leftItems: [
          {
            path: '/',
            label: 'Home',
            exact: true,
          }, {
            path: '/schedule',
            label: 'Schedule',
            requiresAuth: true,
          }
        ],
      };
    },
    methods: {
      show(item) {
        if (item.requiresAuth && !this.$store.getters['logged']) {
          return false;
        }
        return !(item.requiresGuest && this.$store.getters['logged']);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
