<template>
  <div>
    <br/>
    <p>{{quote}}</p>
    <button @click="refreshQuote()">Nouvelle citation</button>
    <div v-if="loading" style="color: orange;">Chargement en cours...</div>
    <div v-if="success" style="color: green;">Le chargement est terminé.</div>
    <div v-if="error" style="color: red;">{{error}}</div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'EasterEgg',
    data() {
      return {
        loading: false,
        success: false,
        error: '',
        quote: ''
      }
    },
    methods: {
      refreshQuote() {
        console.log('created');
        this.loading = true;
        axios.get('https://kaamelott.hotentic.com/api/random').then((resp) => {
          this.quote = resp.data.citation.citation;
          this.loading = false;
        });
      }
    },
    created() {
      this.refreshQuote();
    }
  }
</script>
