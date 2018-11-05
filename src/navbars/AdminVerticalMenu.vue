<template>
  <b-nav vertical pills>
    <b-nav-item
            v-for="item in menuItems"
            v-bind:exact="item.exact"
            v-bind:to="item.path"
    >
      <i :class="item.icon"></i>
      <span class="title">{{ item.label }}</span>
    </b-nav-item>
  </b-nav>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          icon: 'fa fa-hourglass',
          path: '/working-times',
          label: 'Working Times'
        },
        {
          icon: 'fa fa-user',
          path: '/users/index',
          label: 'Users'
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin-left: 5px;
}

</style>
