<template>
  <div>
    <h2>{{name}}</h2>
    <p>Temps : {{weather}} - Température : {{temperature}}°C</p>
    <p><em>Dernière mise à jour : {{formattedDate}}</em></p>
  </div>
</template>

<script>
  import {format, register} from 'timeago.js';
  import timeAgoFr from  'timeago.js/esm/lang/fr';

  register('fr', timeAgoFr);

  export default {
    name: 'City',
    props: {
      name: String,
      weather: String,
      temperature: Number,
      updatedAt: Date
    },
    computed: {
      formattedDate: function() {
        return format(this.updatedAt, 'fr');
      }
    }
  }
</script>

<style scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
