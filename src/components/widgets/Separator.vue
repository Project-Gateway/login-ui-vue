<template>
  <div class="strike">
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'separator',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  .strike {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    margin: 10px auto;
  }

  .strike > span {
    position: relative;
    display: inline-block;
  }

  .strike > span:before,
  .strike > span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: #CCCCCC;
  }

  .strike > span:before {
    right: 100%;
    margin-right: 15px;
  }

  .strike > span:after {
    left: 100%;
    margin-left: 15px;
  }
</style>
