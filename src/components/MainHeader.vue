<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
  name: 'main-header',
  data() {
    return {
      title: 'Renat\'s Gym',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div {
        text-align: center;
    }
</style>
