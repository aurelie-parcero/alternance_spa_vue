<template>
  <form class="search-form">
    <label for="city">Quelle ville ?</label>
    <input type="text" id="city" placeholder="Annecy" v-model.trim="query" required>

    <button @click="loadSelected()">Rechercher</button>
  </form>
  <div class="list-container">
    <div class="list" v-for="city of selectedCities" :key="city"><p>{{ city }}</p>
      <button @click="deleteCity(city)" class="delete">x</button>
    </div>
  </div>


  <form class="search-form">
    <label for="temp">Ville avec température inférieure à: </label>
    <input type="text" id="temp" placeholder="12" v-model="temp" required>
    <button @click="setTemp(temp)" class="delete">Rechercher</button>
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

<style>
.search-form {
  max-width: 50%;
  margin: auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
}

.search-form input {
  margin-top: 20px;
}

.search-form button {
  max-width: 100px;
  margin: 10px auto;
}

.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #fff2f8;
  margin: 5px auto;
  border-radius: 10px;
  width: fit-content;
}

.list button {
  appearance: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: #ded7da;
  outline: none;
  border-color: transparent;
  margin-left: 15px;
  margin-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  cursor: pointer;
}

.list p {
  margin: 0;
  font-size: 13px;
}

.list.max-temp p {
  font-size: 12px;
}

.list.max-temp p span{
  font-size: 13px;
  font-weight: bold;
}
</style>