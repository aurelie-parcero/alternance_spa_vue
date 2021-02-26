<template>
  <form class="search-form">
    <label for="city">Quelle ville ?</label>
    <input type="text" id="city" placeholder="Annecy" v-model.trim="query" required>

    <button class="search-btn" @click="loadSelected()">Rechercher</button>
  </form>
  <div class="list-container">
    <div class="list" v-for="city of selectedCities" :key="city"><p>{{ city }}</p>
      <button @click="deleteCity(city)" class="delete">x</button>
    </div>
  </div>


  <form class="search-form">
    <label for="temp">Ville avec température inférieure à: </label>
    <input type="text" id="temp" placeholder="12" v-model="temp" required>
    <button @click="setTemp(temp)" class="search-btn">Rechercher</button>
  </form>

  <div class="list-container">
    <div v-if="maxTemp != null" class="list max-temp" :key="maxTemp"><p>Température inférieure à <span>{{ maxTemp }} °C</span></p>
      <button @click="setTemp(null)" class="delete">x</button>
    </div>
  </div>

</template>


<script lang="ts">

import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";
import {ref} from 'vue';

export default defineComponent({
  name: 'Search',
  data() {
    return {
      temp: null
    }
  },

  setup() {
    const store = useStore();
    const query = ref();
    const list: object[] = [];

    return {
      list,
      query,
      maxTemp: computed(() => store.state.maxTemp),
      cities: computed(() => store.state.cities),
      selectedCities: computed(() => store.state.selectedCities),
      loadSelected(): void {
        if(list.indexOf(query.value) === -1) {
          list.push(query.value);
          store.dispatch('loadSelectedCities', list);
        }

      },

      deleteCity(cityName: string): void {
        if (store.state.selectedCities.indexOf(cityName) !== -1) {
          list.splice(store.state.selectedCities.indexOf(cityName), 1);
          store.dispatch('deleteSelected', store.state.selectedCities.indexOf(cityName));
        }

      },
      setTemp(temp: number): void {
        store.commit('setMaxTemp', temp);
      },

    };
  },


});
</script>
