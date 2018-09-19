<template>
  <div>
    <DraggableCal v-on:dateSelected="dateClick"></DraggableCal>

    <h1>Select Services on {{ serviceDate }}</h1>

    <h2>Regular group classes. Limited availability.</h2>

    <service-list />

    <h2>One on one and consultations</h2>

    <open-service-list></open-service-list>

  </div>

</template>

<script>
  import DraggableCal from 'vue-draggable-cal';
  import ServiceList from '@/components/ServiceList';
  import OpenServiceList from '@/components/OpenServiceList';

  export default {
    name: 'date-picker',
    components: { DraggableCal, ServiceList, OpenServiceList },
    data: function() {
      return {
        serviceDate: 'Today'
      }
    },
    methods: {
      dateClick: function (event) {
        this.serviceDate = event.toDateString();
        this.getServiceList();
      },
      getServiceList: function() {
        axios.get('/api/get-services/' + this.serviceDate)
        .then((response) => {
          console.log(response);
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
