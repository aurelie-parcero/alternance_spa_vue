<template>
  <section class="flex">
    <div class="search">
      <Search></Search>
    </div>
    <div class="cities-list">
      <h1>Liste des villes</h1>
      <div class="flex">
        <City v-for="city of cities" :key="city.id" :name="city.name" :weather="city.weather"
              :temperature="city.temperature" :updated-at="city.updatedAt"></City>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import City from "./City.vue";
import {defineComponent, onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import Search from "./Search.vue";

export default defineComponent({
  name: 'CitiesList',
  components: {
    Search,
    City
  },
  setup() {
    const store = useStore();
    onMounted(() => {
    });

    return {
      cities: computed(() => store.state.cities),
    };

  },


});
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 90vw;
  margin: auto;
}

.flex > * {
  margin: 10px 40px;
}

.search {
  flex: 1;
}

.cities-list {
  flex: 3.5;
}
</style>
