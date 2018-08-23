<template>
    <div id="chat">
        <input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)">
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
      }
    },
    mounted() {
      this.$pnSubscribe({ channels: ['map'], withPresence: true });
    },
    beforeMount: function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            //set coordinates
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            this.markOnMap();
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
          lat: this.lat,
          lng: this.lng
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
      receptor(msg) {
        this.lat = msg.lat;
        this.lng = msg.lng;
      },
      markOnMap () {
        this.$refs.GoogleMap.addMarker(this.lat, this.lng);
      }
    }
  }
</script>

<style scoped>

</style>
