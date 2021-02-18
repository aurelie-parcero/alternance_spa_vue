<template>
  <div>
    <h1>Carte des villes</h1>

    <div id="map"/>
    <!--    <mapbox-->
    <!--        :map-options="{-->
    <!--        style: 'https://maps.hotentic.com/styles/isere/style.json',-->
    <!--        center: [6.0925617, 45.8910906],-->
    <!--        zoom: 10,-->
    <!--      }"-->
    <!--        @map-load="loaded"-->
    <!--    />-->
  </div>
</template>

<script lang="js">

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {onMounted} from "vue";
import axios from "axios";

export default {
  name: 'CitiesMap',
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
          "pk.eyJ1Ijoic29uaWFjbiIsImEiOiJja2w5aHB0amIwOW9nMm9vb2JkODBoOWpkIn0.OzS_BnyJucJStUhfvnaFcA";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v9",
        // center: [6.0925617, 45.8910906],
        center: [process.env.VUE_APP_DEFAULT_LONGITUDE, process.env.VUE_APP_DEFAULT_LATITUDE],
        zoom: 11,
      });
      map.on('load', () => {
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl');
        let cities = [];
        const url = 'https://api.openweathermap.org/data/2.5/find?lat=' + process.env.VUE_APP_DEFAULT_LATITUDE + '&lon=' + process.env.VUE_APP_DEFAULT_LONGITUDE + '&cnt=20&cluster=yes&lang=fr&units=metric&APPID=' + process.env.VUE_APP_OW_APP_ID;
        console.log(url);
        axios
            .get(url)
            .then((citiesData) => {
              for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
              } of citiesData.data.list) {
                cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
              }
              cities.forEach(city => {
                let el = document.createElement('img');
                el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
                el.classList.add('marker');
                el.title = `${city.name} - ${city.temperature}°C`;
                new mapboxgl.Marker(el)
                    .setLngLat([city.lon, city.lat])
                    .addTo(map);
              });
            });
      });
    });
    return {};
  },
};
</script>
<style scoped>
h1 {
  margin: 40px 0 0;
}

/*#map {*/
/*  height: 100vh;*/
/*}*/


</style>
