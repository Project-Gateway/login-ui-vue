<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">Renat's Gym - Admin</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <user-menu></user-menu>

    </b-collapse>
  </b-navbar>

</template>

<script>
  import UserMenu from '@/navbars/UserMenu.vue';

  export default {
    components: {
      UserMenu
    },
    name: 'main-menu',
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
          }, {
            path: '/working-times',
            label: 'Working Times',
            requiresAuth: true,
          }
        ],
      };
    },
    methods: {
      logout() {
        this.$store.dispatch('identity/logout').then(() => {
          this.$router.push('/');
        });
      },
      show(item) {
        if (item.requiresAuth && !this.logged) {
          return false;
        }
        return !(item.requiresGuest && this.logged);
      }
    },
    computed: {
      logged() {
        return this.$store.getters['identity/logged'];
      },
      identity() {
        return this.$store.state.identity;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
