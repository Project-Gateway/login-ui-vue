<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col v-for="col in columnArray">
        <span
                v-for="slot in columnSlots(col)"
                v-on:click.stop="selectTime(slot)"
                :class="selected == slot ? 'time-select-bold' : 'time-select'"
        >
          {{ slot }}
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'time-slot-picker',
    props: {
      slots: {
        type: Array,
        default: () => []
      },
      columns: {
        default: 3
      },
      selected: {
        default: null
      }
    },
    data: function () {
      return {
//        selected: null,
      };
    },
    model: {
      prop: 'selected',
      event: 'on-select'
    },
    methods: {
      columnSlots: function(column) {
        return this.slots.filter((item, key) => key < ((this.slots.length / this.columns) * column) && key >= ((this.slots.length / this.columns) * (column - 1)));
      },
      selectTime: function(time) {
        //this.selected = time;
        this.$emit('on-select', time);
      }
    },
    computed: {
      columnArray: function() {
        let arr = [];
        for (let i = 1; i <= this.columns; i++) {
          arr.push(i);
        }
        return arr;
      }
    }
  }
</script>

<style scoped>
  .time-select {
    text-decoration: underline;
    display: block;
    cursor: pointer;
  }
  .time-select-bold {
    text-decoration: underline;
    display: block;
    cursor: pointer;
    font-weight: bold;
  }
</style>
