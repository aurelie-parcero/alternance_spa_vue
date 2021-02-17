import Vue from 'vue'
import VueRouter from 'vue-router'
import CitiesList from "../components/CitiesList";
import CitiesMap from "../components/CitiesMap";
import City from "../components/City";
import EasterEgg from "../components/EasterEgg";

Vue.use(VueRouter);

const routes = [
  { path: '/villes', component: CitiesList },
  { path: '/carte', component: CitiesMap },
  { path: '/ville', component: City },
  { path: '/onenagros', component: EasterEgg}
];

export const router = new VueRouter({
  routes
});
