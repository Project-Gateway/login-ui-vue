<template>
  <div>
    <h1>Working Times</h1>
    <full-calendar
            :config="config"
            :events="events"
            @event-selected="onEventSelected"
            @event-resize="onEventChange"
            @event-drop="onEventChange"
            @event-created="onEventCreated"
            @view-render="onViewRender"
    ></full-calendar>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  export default {
    data: () => ({
      events: [
//        {
//          start: '2018-10-22 19:00:00',
//          end: '2018-10-22 19:30:00',
//        },
      ],
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
      },
    }),
    methods: {
      onViewRender: function (view, element) {
        axios.get(`/schedule-api/working-times/${view.intervalStart.year()}/${view.intervalStart.week()}`)
        .then((response) => {
          this.events = response.data.times;
        });
      },
      onEventChange: function (event) {
        axios.put(`/schedule-api/working-times/${event.id}`, {
          date: event.start.format('YYYY-MM-DD'),
          start_time: event.start.format('HH:mm:ss'),
          finish_time: event.end.format('HH:mm:ss')
        });
      },
      onEventCreated: function(event) {

        axios.post(`/schedule-api/working-times`, {
          date: event.start.format('YYYY-MM-DD'),
          start_time: event.start.format('HH:mm:ss'),
          finish_time: event.end.format('HH:mm:ss')
        })
        .then((response) => {
          this.events.push({
            id: response.data.id,
            start: `${response.data.date} ${response.data.start_time}`,
            end: `${response.data.date} ${response.data.finish_time}`,
          });
        });
      },
      onEventSelected: function () {
        console.log('selected');
      },
    },
  };
</script>

<style scoped>

</style>
