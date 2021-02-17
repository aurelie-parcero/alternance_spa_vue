import { createWebHistory, createRouter } from "vue-router";
import CitiesList from "../components/CitiesList";
import CitiesMap from "../components/CitiesMap";
import City from "../components/City";
import EasterEgg from "../components/EasterEgg";

const routes = [
  { path: '/villes', component: CitiesList },
  { path: '/carte', component: CitiesMap },
  { path: '/ville', component: City },
  { path: '/onenagros', component: EasterEgg}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;