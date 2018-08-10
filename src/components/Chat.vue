<template>
    <div id="chat">
        <input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)">
        <div v-for="msg in messages">{{msg.message}} - {{msg.lat}} : {{msg.lng}}</div>
        <google-map ref="GoogleMap"></google-map>
    </div>

</template>

<script>
  import Firebase from 'firebase';
  import Geohash from 'latlon-geohash';
  import GoogleMap from './GoogleMap';

  export default {
    name: 'Chat',
    components: {
      GoogleMap
    },
    data() {
      return {
        room: null,
        precision: 6, // default precision
        db: 'what-db', // assign Firebase SDK later
        messageInput:'', // this is for v-model
        messages: [],
        lat: null,
        lng: null,
      }
    },
    mounted() {
      if (!Firebase.apps.length) {
        this.db = Firebase.initializeApp({
          apiKey: "AIzaSyBfs6kpTe24ElhBDVdfIYWH4J_06W-5DdU",
          authDomain: "project-gateway-211419.firebaseapp.com",
          databaseURL: "https://project-gateway-211419.firebaseio.com",
          projectId: "project-gateway-211419",
          storageBucket: "project-gateway-211419.appspot.com",
          messagingSenderId: "506947634713"
        });
      }
    },
    beforeMount: function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            let geohash = Geohash.encode(position.coords.latitude, position.coords.longitude, this.precision);
            //set coordinates
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            // initilize the room based on geohash
            this.room = this.db.database().ref().child('rooms/' + geohash);

            // must call messageListener() to listen to the new message event
            this.messageListener();
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
        if (!this.room) {
          console.log('no room');
        }

        // A data entry.
        let data = {
          message: messageInput,
          lat: this.lat,
          lng: this.lng
        };

        // Get a key for a new message.
        let key = this.room.push().key;
        this.room.child('messages/' + key).set(data);

        // clean the message
        this.messageInput = '';
      },
      messageListener () {
        this.room.child('messages').on('child_added', (snapshot) => {
          // push the snapshot value into a data attribute
          this.messages.push(snapshot.val());
        })
      },
      markOnMap () {
        console.log(this.messages);
        console.log(this.lat);
        // this.$refs.GoogleMap.addMarker(this.lat, this.lng);
      }
    }
  }
</script>

<style scoped>

</style>
