<template>
  <b-table striped hover :items="openServices" :fields="fields">
    <template slot="time_pick" slot-scope="data">
      <b-container class="bv-example-row">
        <b-row>
            <b-col>
              <span class="time-select"
                :class="{'time-select-bold': 700 + data.index == activeIndex}" @click.stop="selectServiceTime(700, data.index)">7:00 AM</span>
              <span class="time-select"
                :class="{'time-select-bold': 800 + data.index == activeIndex}" @click.stop="selectServiceTime(800, data.index)">8:00 AM</span>
              <span class="time-select"
                :class="{'time-select-bold': 900 + data.index == activeIndex}" @click.stop="selectServiceTime(900, data.index)">9:00 AM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1000 + data.index == activeIndex}" @click.stop="selectServiceTime(1000, data.index)">10:00 AM</span>
            </b-col>
            <b-col>
              <span class="time-select"
                :class="{'time-select-bold': 1100 + data.index == activeIndex}" @click.stop="selectServiceTime(1100, data.index)">11:00 AM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1200 + data.index == activeIndex}" @click.stop="selectServiceTime(1200, data.index)">12:00 PM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1300 + data.index == activeIndex}" @click.stop="selectServiceTime(1300, data.index)">1:00 PM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1400 + data.index == activeIndex}" @click.stop="selectServiceTime(1400, data.index)">2:00 PM</span>
            </b-col>
            <b-col>
              <span class="time-select"
                :class="{'time-select-bold': 1500 + data.index == activeIndex}" @click.stop="selectServiceTime(1500, data.index)">3:00 PM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1600 + data.index == activeIndex}" @click.stop="selectServiceTime(1600, data.index)">4:00 PM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1700 + data.index == activeIndex}" @click.stop="selectServiceTime(1700, data.index)">5:00 PM</span>
              <span class="time-select"
                :class="{'time-select-bold': 1800 + data.index == activeIndex}" @click.stop="selectServiceTime(1800, data.index)">6:00 PM</span>
            </b-col>
        </b-row>
    </b-container>
    </template>
    <template slot="instructor_name" slot-scope="data">
      <b-form-select @change="selectServiceProvider($event, data.index)" :options="openServices[data.index].providers" class="mb-3" size="sm" />
    </template>
    <template slot="show_details" slot-scope="data">
      <b-button size="sm" @click.stop="makeReservation(data.item.id, data.index)" class="mr-2">
        Make Reservation
      </b-button>
      <p>{{ errorText[data.index] }}</p>
    </template>
 </b-table>

</template>

<script>
import axios from 'axios';

export default {
  name: 'open-service-list',
  data () {
    return {
      fields: [ 'name', 'instructor_name', 'time_pick', 'show_details' ],
      time: new Date(),
      options: [
        { value: null, text: 'Any available' },
        { value: 1, text: 'Chef Brown' },
        { value: 2, text: 'Chef Carmella' },
      ],
      apiData: [],
      errorText: ['Please select instructor and time', 'Please select instructor and time'],
      activeIndex: null
    }
  },
  props: [
    'openServices',
    'serviceDate'
  ],
  methods: {
    makeReservation (serviceId, index) {
      if (!this.apiData[index] || !this.apiData[index]['service_provider_id'] || !this.apiData[index]['time']) {
        console.log('empty something');
        this.errorText.index = 'Select instructor and time!';
        return;
      }
      this.apiData[index]['service_id'] = serviceId;

      console.log(this.apiData[index]);
    },
    selectServiceProvider (id, index) {
      if (!this.apiData[index]) {
        this.apiData[index] = [];
      }
      this.apiData[index]['service_provider_id'] = id;
      this.getServiceProviderAvailability(id);
    },
    selectServiceTime (time, index) {
      this.activeIndex = time + index;
      if (!this.apiData[index]) {
        this.apiData[index] = [];
      }

      this.apiData[index]['time'] = time;
    },
    getServiceProviderAvailability: function(id) {
      axios.get(`/schedule-api/availability/${this.serviceDate}/${id}`)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  .bv-example-row {
    font-size: 12px;
  }

  .errorText {
    font-size: 8px;
  }

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
