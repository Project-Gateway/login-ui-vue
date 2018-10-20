<template>
  <div>
    <DraggableCal v-on:dateSelected="dateClick"></DraggableCal>

    <div v-if="ready && !!serviceDate">

      <h1>Select Services on {{ serviceDate }}</h1>

      <!--h2>Regular group classes. Limited availability.</h2>

      <service-list /-->

      <h2>One on one and consultations</h2>

      <open-service-list
              v-bind:openServices="openServices"
              v-bind:serviceDate="serviceDate"
      >
      </open-service-list>
    </div>
    <div class="loading" v-else-if="!ready && !serviceDate">Select Date...</div>
    <div class="loading" v-else>Loading...</div>

  </div>

</template>

<script>
  import DraggableCal from 'vue-draggable-cal';
  import ServiceList from '@/components/ServiceList';
  import OpenServiceList from '@/components/OpenServiceList';
  import axios from 'axios';

  export default {
    name: 'date-picker',
    components: {DraggableCal, ServiceList, OpenServiceList},
    data: function () {
      return {
        serviceDate: null,
        openServices: [],
        ready: false
      };
    },
    methods: {
      dateClick: function (event) {
        this.serviceDate = event.toISOString().slice(0, 10);
        this.getServiceList();
      },
      getServiceList: function () {
        this.ready = false;
        axios.get(`/schedule-api/appointments/${this.serviceDate}`)
        .then((response) => {
          this.openServices = Object.values(response.data);
          this.ready = true;
        }).catch((error) => {
          console.log(error);
        });
      },
    },
    watch: {
      dateSelected: function (newthing, old) {
        console.log(newthing, old);
      },
    },

  };
</script>

<style scoped>
  .loading {
    text-align: center;
    font-size: 30px;
  }
</style>
