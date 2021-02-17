<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of cities" :key="city.id" :name="city.name" :weather="city.weather" :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script>
  import City from "./City";
  import axios from "axios";

  export default {
    name: 'CitiesList',
    components: {
      City
    },
    data() {
      return {
        cities: []
      }
    },
    methods: {
      loadCities(citiesData) {
        this.cities = [];
        for (const {name, weather: [{description: weather}], main: {temp: temperature}, dt: updatedAt} of citiesData) {
          this.cities.push({name, weather, temperature, updatedAt: new Date(updatedAt * 1000)});
        }
      }
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
