<template>
  <b-table striped hover :items="items" :fields="fields">
    <template slot="show_details" slot-scope="data">
      <b-button size="sm" @click.stop="makeReservation(data.item.id)" class="mr-2" v-model="available">
        Make Reservation
      </b-button>
    </template>
    <template slot="available" slot-scope="data">
      {{ available }}
    </template>
 </b-table>

</template>

<script>
import axios from 'axios';

export default {
  name: 'service-list',
  data () {
    return {
      fields: {
        name: {
          label: 'Class name'
        },
        instructor: {
          label: 'Instructor'
        },
        available: {
          label: 'Open spots'
        },
        'show_details': {
          label: false
        }
      },
      items: [
        {
          id: 1, name: 'Zumba', instructor: 'Dickerson', available: 3,
        availableTimes: [7, 9,  12]
        },
        { id: 2, name: 'Boxing', instructor: 'Larsen', available: 10, maxCapacity: 10 },
        { id: 3, name: 'Power lifing', instructor: 'Geneva', available: 5, maxCapacity: 5 },
        { id: 4, name: 'Yoga', instructor: 'Jami', available: 10, maxCapacity: 20 }
      ],
      available: 1
    }
  },
  methods: {
    makeReservation (id) {
      console.log(this.items[id].instructor);
      axios.post('/api/make-request', {
        service_id: id,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  watch: {
    available: {
      // getter
      get: function () {
        return this.items[0].available
      },
      // setter
      set: function (newValue) {
        console.log(newValue);
        this.available = newValue;
      }
  }
  }
}
</script>

<style>
</style>


