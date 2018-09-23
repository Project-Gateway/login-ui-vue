<template>
  <div>
    <DraggableCal v-on:dateSelected="dateClick"></DraggableCal>

    <h1>Select Services on {{ serviceDate }}</h1>

    <h2>Regular group classes. Limited availability.</h2>

    <service-list />

    <h2>One on one and consultations</h2>

    <open-service-list
      v-bind:openServices="openServices"
      v-bind:serviceDate="serviceDate"
    >
    </open-service-list>

  </div>

</template>

<script>
  import DraggableCal from 'vue-draggable-cal';
  import ServiceList from '@/components/ServiceList';
  import OpenServiceList from '@/components/OpenServiceList';
  import axios from 'axios';

  export default {
    name: 'date-picker',
    components: { DraggableCal, ServiceList, OpenServiceList },
    data: function() {
      return {
        serviceDate: 'Today',
        openServices: [],
      }
    },
    methods: {
      dateClick: function (event) {
        this.serviceDate = event.toISOString().slice(0,10);
        this.getServiceList();
      },
      getServiceList: function() {
        axios.get(`/schedule-api/appointments/${this.serviceDate}`)
        .then((response) => {
          console.log(response.data);
          this.openServices = response.data;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    watch: {
      dateSelected: function (newthing, old) {
        console.log(newthing, old);
      }
  },

  }
</script>

<style>
</style>
