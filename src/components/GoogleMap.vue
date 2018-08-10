<template>
  <div>
    <hr />
      <gmap-map
        v-bind:center="center"
        v-bind:zoom="17"
        style="width:100%;  height: 400px;"
      >
      <gmap-marker
        v-bind:key="index"
        v-for="(m, index) in markers"
        v-bind:position="m.position"
        v-on:click="center=m.position"
        v-bind:label="message"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'google-map',
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      message: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place lat, lng
    addMarker(lat, lng) {
      console.log(lat);
        if (lat && lng) {
          const marker = {
            lat: lat,
            lng: lng
          };
          this.markers.push({ position: marker });
          this.center = marker;
        }
    },
    geolocate: function() {

      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // including a marker on your current location
        this.markers.push({position: this.center});

      });
    }
  }
};
</script>
