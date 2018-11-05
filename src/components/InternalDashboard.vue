<template>
  <div>
    <h1>Scheduled Classses</h1>

    <full-calendar
            :config="config"
            :events="events"
            @view-render="onViewRender"
    ></full-calendar>
  </div>
</template>

<script>
  export default {
    name: 'internal-dashboard',
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
      onViewRender(view) {
        this.$store.state.scheduleApi.get(`/appointments/internal/${view.intervalStart.year()}/${view.intervalStart.week()}`)
        .then(response => {
          this.events = response.data.times.map(({service, customer, start, end}) => ({
            title: `${service} for ${customer}`,
            start,
            end
          }));
        });
      }
    },
  }
</script>

<style scoped>

</style>
