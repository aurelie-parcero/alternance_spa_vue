<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of cities" :key="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updated-at="city.updatedAt"></City>

  </div>
</template>

<script lang="ts">

import City from "./City.vue";
import {defineComponent, onMounted, computed} from 'vue';
import {useStore} from 'vuex'

export default defineComponent({
  name: 'CitiesList',
  components: {
    City
  },
  setup() {
    const store = useStore();
    onMounted(() => {

      store.dispatch("getCities");

    });

    return {
      cities: computed(() => store.state.cities),
    };

  },
  // watch: {
  //   timeDiff: function() {
      //if(Date.now() - Date.parse(localStorage.lastUpdate).valueOf() > 1000) {
      //   console.log(localStorage.lastUpdate);
      //   console.log('hey');
    //  }

      // const store = useStore();
      // let diff = Date.now() - Date.parse(localStorage.lastUpdate).valueOf();
      // if(diff > 1000) {
      //   store.dispatch("getCities");
    // }
    //localStorage.lastUpdate = new Date();
  // }

});
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
