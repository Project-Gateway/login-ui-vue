<template>
  <div>
    <h1>Working Times</h1>
    <b-form-select
            v-model="selectedProvider"
            :options="providers"
            class="mb-3"
            v-if="!!providers.length"
            v-on:change="onProviderChange"
    />
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

  export default {
    data: () => ({
      events: [
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
      providers: [],
      selectedProvider: null,
      year: null,
      week: null,
    }),
    methods: {
      indexWorkingTimes: function (providerId = null) {
        let url = `/working-times/${this.year}/${this.week}`;
        if (providerId !== null) {
          url+= `/${providerId}`;
        }
        this.$store.state.scheduleApi.get(url)
        .then((response) => {
          this.events = response.data.times;
        });
      },
      onProviderChange (selected) {
        if (selected !== null) {
          this.indexWorkingTimes(selected);
        }
      },
      onViewRender: function (view, element) {
        if (!this.providers.length) {
          this.year = view.intervalStart.year();
          this.week = view.intervalStart.week();
          this.indexWorkingTimes();
        }
      },
      onEventChange: function (event) {
        this.$store.state.scheduleApi.put(`working-times/${event.id}`, {
          date: event.start.format('YYYY-MM-DD'),
          start_time: event.start.format('HH:mm:ss'),
          finish_time: event.end.format('HH:mm:ss')
        });
      },
      onEventCreated: function(event) {
        let url = '/working-times';
        if (this.selectedProvider !== null) {
          url+= `/${this.selectedProvider}`;
        }
        this.$store.state.scheduleApi.post(url, {
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
    created: function() {
      if (this.$store.state.role === 'admin') {
        this.$store.state.loginApi.get('/users/by-role/professional')
        .then(response => {
          const providers = response.data.map(item => ({ value: item.id, text: `${item.first_name} ${item.last_name}`}));
          this.providers = [{value: null, text: 'Select the professional'}, ...providers];
        });
      }
    }
  };
</script>

<style scoped>

</style>
