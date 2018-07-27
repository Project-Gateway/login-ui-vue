<template>
  <b-navbar toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item
                v-for="item in leftItems"
                v-bind:key="item.path"
                v-bind:active="$route.fullPath == item.path"
        >
          <router-link v-bind:to="item.path">{{ item.label }}</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown v-if="logged" right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ identity.emails[0] }}
          </template>
          <b-dropdown-item v-on:click="logout">
            Log Out
          </b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</template>

<script>
export default {
  name: 'main-menu',
  data() {
    return {
      leftItems: [
        {
          path: '/',
          label: 'Home',
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('identity/logout');
    },
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
