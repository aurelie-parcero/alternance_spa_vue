<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Temps : {{ weather }} - Température : {{ temperature }}°C</p>
    <p><em>Dernière mise à jour : {{ currentDateTime(updatedAt) }}</em></p>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import moment from "moment";

export default defineComponent({
  name: 'City',
  props: {
    name: String,
    weather: String,
    // @ts-ignore
    temperature: Number,
    updatedAt: Date,
  },
  methods: {
    currentDateTime(date: Date) {
      moment.locale("fr");
      return moment(date).fromNow();
    }
  },
  setup() {
    onMounted(() => {

    });
  }
});
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
