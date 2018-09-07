<template>

    <div id="chat">
        <p>
          Total users: {{ occupancy }}
        </p>
        <input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)"> <button v-on:click="send(messageInput)">Send message</button>
        <div v-for="msg in messages">{{msg.message}}</div>
        <google-map ref="GoogleMap"></google-map>
    </div>

</template>

<script>
  import GoogleMap from './GoogleMap';

  export default {
    name: 'Chat',
    components: {
      GoogleMap
    },
    data() {
      return {
        messages: this.$pnGetMessage('map', this.receptor),
        messageInput: null,
        lat: null,
        lng: null,
        occupancy: 0,
      }
    },
    computed: {
      geoLocation: function() {
        return this.$store.getters['geo/geoLocation'];
      }
    },
    mounted() {
      this.$pnGetInstance().setUUID(this.$store.state.identity.userId || Date.now());
      this.$pnSubscribe({ channels: ['map'], withPresence: true });
      this.$pnGetPresence('map', this.presence);
    },
    beforeMount: function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            //set coordinates
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.$store.dispatch('geo/saveLocation', {lat: this.lat, lng: this.lng});
            this.markOnMap(this.lat, this.lng);

          }, (err) => {
            // error handling here
          });
        } else {
          console.error('Cannot access geolocation');
        }
    },
    methods: {
      send(messageInput) {

        // A data entry.
        let data = {
          message: messageInput,
          lat: this.geoLocation.lat,
          lng: this.geoLocation.lng,
        };

        // Get a key for a new message.
        this.$pnPublish({
            channel: 'map',
            message: data
          },
          (status, response) => console.log(status, response)
        );

        // clean the message
        this.messageInput = '';
      },
      presence(ps) {
        this.occupancy = ps.occupancy;
      },
      receptor(msg) {
        console.log('got msg', msg.message);
        this.markOnMap(msg.message.lat, msg.message.lng);
      },
      markOnMap (lat, lng) {
        console.log(lat, lng);
        this.$refs.GoogleMap.addMarker(lat, lng);
      }
    }
  }
</script>

<style scoped>

</style>
