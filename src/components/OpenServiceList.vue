<template>
  <b-table striped hover :items="openServices" :fields="fields">
    <template slot="time_pick" slot-scope="data">
      <div v-if="!timePickerState[data.index]">Select Instructor...</div>
      <div v-else-if="timePickerState[data.index] == 'loading'">Loading...</div>
      <time-slot-picker
              :slots="timeSlots[data.index]"
              columns="3"
              v-model="selectedTime[data.index]"
              v-else-if="timePickerState[data.index] == 'ready'"
      ></time-slot-picker>
    </template>
    <template slot="instructor_name" slot-scope="data">
      <b-form-select
              @change="selectServiceProvider($event, data.index)"
              :options="providersDropdown(data.index)"
              v-model="selectedInstructor[data.index]"
              class="mb-3"
              size="sm"
      />
    </template>
    <template slot="reservation" slot-scope="data">
      <b-button size="sm" class="mr-2" disabled v-if="!selectedInstructor[data.index]">Select Instructor</b-button>
      <b-button size="sm" class="mr-2" disabled v-else-if="!selectedTime[data.index]">Select Time</b-button>
      <b-button
              size="sm"
              @click.stop="makeReservation(data.item.id, data.index)"
              class="mr-2"
              v-else-if="!buttonState[data.index]"
      >
        Make Reservation
      </b-button>
      <b-button size="sm" class="mr-2" disabled variant="warning" v-else-if="buttonState[data.index] === 'loading'">
        Checking...
      </b-button>
      <b-button size="sm" class="mr-2" disabled variant="success" v-else-if="buttonState[data.index] === 'ready'">
        Reserved!
      </b-button>

    </template>
 </b-table>

</template>

<script>
import axios from 'axios';
import TimeSlotPicker from './TimeSlotPicker.vue';

export default {
  components: {TimeSlotPicker},
  name: 'open-service-list',
  data () {
    return {
      fields: [ 'name', 'instructor_name', 'time_pick', 'reservation' ],
      time: new Date(),
      selectedInstructor: [],
      options: [],
      apiData: [],
      errorText: [],
      activeIndex: null,
      timeSlots: [],
      selectedTime: [],
      timePickerState: [],
      buttonState: [],
    }
  },
  props: [
    'openServices',
    'serviceDate'
  ],
  watch: {
    openServices: function (newValue, oldValue) {
      const arr = Object.keys(this.openServices);
      this.selectedInstructor = arr.map(item => null);
      this.timeSlots = arr.map(item => []);
      this.selectedTime = arr.map(item => null);
      this.errorText = arr.map(item => '');
      this.timePickerState = arr.map(item => 'empty');
    }
  },
  methods: {
    makeReservation (serviceId, index) {
      this.$set(this.buttonState, index, 'loading');
      axios.post('/schedule-api/appointments/schedule', {
        service_id: serviceId,
        provider_id: this.selectedInstructor[index],
        time: `${this.serviceDate} ${this.selectedTime[index]}`,
      })
      .then((response) => {
        this.$set(this.buttonState, index, 'ready');
      })
      .catch((error) => {
        console.log(error);
      });
    },
    selectServiceProvider (id, index) {
      this.getServiceProviderAvailability(id, index);
    },
    getServiceProviderAvailability: function(id, index) {
      this.$set(this.timePickerState, index, 'loading');
      axios.get(`/schedule-api/availability/${this.serviceDate}/${id}`)
      .then((response) => {
        this.$set(this.timeSlots, index, response.data);
        this.$set(this.timePickerState, index, 'ready');
      }).catch((error) => {
        console.log(error);
      });
    },
    providersDropdown: function(index) {
      const arr = Object.values(this.openServices[index].providers);
      return arr.map(item => ({value: item.id, text: `${item.first_name} ${item.last_name}`}));
    },

  },
}
</script>

<style scoped>
  .bv-example-row {
    font-size: 12px;
  }

  .errorText {
    font-size: 8px;
  }
</style>
