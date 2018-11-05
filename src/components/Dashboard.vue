<template>
  <div id="container">
    <full-calendar
            :config="config"
            :events="events"
            @event-selected="onEventSelected"
            @view-render="onViewRender"
    ></full-calendar>
  </div>
</template>

<script>

  export default {
    name: 'dashboard',
    data: () => ({
      events: [],
      config: {
        themeSystem: 'bootstrap4',
        defaultView: 'agendaWeek',
        allDaySlot: false,
        businessHours: {
          start: '06:00',
          end: '20:00',
        },
        header: {
          center: 'title',
          left: 'prev,next today',
          right: '',
        },
        editable: false,
      },
    }),
    methods: {
      onEventSelected() {
        console.log('selected');
      },
      onViewRender(view) {
        this.$store.state.scheduleApi.get(`/appointments/${view.intervalStart.year()}/${view.intervalStart.week()}`)
        .then(response => {
          this.events = response.data.times.map(({service, provider, start, end}) => ({
            title: `${service} with ${provider}`,
            start,
            end
          }));
        });
      },
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  margin: 20px;
}
</style>
