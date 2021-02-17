<template>
  <div>
    <h1>Carte des villes</h1>
    <mapbox
        :map-options="{
        style: 'https://maps.hotentic.com/styles/isere/style.json',
        center: [6.0925617, 45.8910906],
        zoom: 10,
      }"
        @map-load="loaded"
    />
  </div>
</template>

<script>
  import axios from "axios";
  import Mapbox from 'mapbox-gl-vue';

  export default {
    name: 'CitiesMap',
    components: {
      Mapbox
    },
    data() {
      return {
        cities: []
      }
    },
    methods: {
      loadCities(citiesData) {
        this.cities = [];
        for (const {name, coord: {lat, lon}, weather: [{description: weather, icon: icon}], main: {temp: temperature}, dt: updatedAt} of citiesData) {
          this.cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
        }
      },
      loaded(map) {
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl');

        this.cities.forEach(function(city) {
          let el = document.createElement('img');
          el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
          el.classList.add('marker');
          el.title = `${city.name} - ${city.temperature}°C`;

          new mapboxgl.Marker(el)
            .setLngLat([city.lon, city.lat])
            .addTo(map);
        });
      },
    },
    mounted() {
      axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
        .then((resp) => this.loadCities(resp.data.list));
    }
  }
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }

</style>
