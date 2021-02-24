<template>
  <form class="search-form">
    <label for="city">Quelle ville ?</label>
    <input type="text" id="city" placeholder="Annecy" v-model="query" required>

    <button @click="loadSelected($event)">Rechercher</button>
  </form>
<div class="list-container">
  <div class="list" v-for="city of selectedCities" :key="city"><p>{{city}}</p><button @click="deleteCity($event, city)" class="delete">x</button></div>
</div>
  <p></p>
</template>


<script lang="ts">

import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";
import { ref } from 'vue';

export default defineComponent({
  name: 'Search',

  components: {
  },
  setup() {
    const store = useStore();
    const query = ref();
    const list: object[] = [];

    return {
      list,
      query,
      selectedCities: computed(() => store.state.selectedCities),
      loadSelected(event: any): void {
        list.push(query.value);
        event.preventDefault();
        store.dispatch('loadSelectedCities', list);
      },

      deleteCity (event: any, cityName: string): void{
        if(store.state.selectedCities.indexOf(cityName) !== -1) {
          console.log(list)
          list.splice(store.state.selectedCities.indexOf(cityName), 1);
          store.dispatch('deleteSelected', store.state.selectedCities.indexOf(cityName));
          console.log(list)
        }


      }


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
  background-color:#fff2f8;
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
}
</style>