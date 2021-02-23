<template>
<!--  <p v-for="city in cities" :lat-lng="[city.lat, city.lon]" :key="city.name">-->
<!--    {{ city.lat }} - {{city.lon}} </p>-->
  <div style="height: 75vh; width: 100vw; margin: 20px auto;">
    <l-map
        v-model:zoom="zoom"
        :center="centerMap"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in cities" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize"/>
      </l-marker>
    </l-map>
  </div>
</template>

<script>

import {defineComponent, onMounted, computed} from 'vue';
import {useStore} from "vuex";
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default defineComponent({
  name: 'CitiesMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("getCities");

    });

    return {
      centerMap: computed(() => store.state.centerMap),
      cities: computed(() => store.state.cities),
      iconSize: computed(() => store.state.iconSize),
      zoom: computed(() => store.state.zoom),

    };
  },


});
</script>
<style scoped>
h1 {
  margin: 40px 0 0;
}

</style>
