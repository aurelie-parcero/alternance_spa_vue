import {createStore, Store} from 'vuex'
import axios from "axios";

let iconWidth = 50;
let iconHeight = 50;

export default createStore({
    state: {
        cities: [],
        centerMap: [process.env.VUE_APP_DEFAULT_LATITUDE, process.env.VUE_APP_DEFAULT_LONGITUDE],
        iconSize: [iconWidth, iconHeight],
        zoom: 12,
    },
    mutations: {
        getCitiesList: (state, cities) => (state.cities = cities),
    },
    actions: {
        async getCities({commit, dispatch}) {
            let diff = Date.now() - Date.parse(localStorage.lastUpdate).valueOf();
            console.log("Dernière mise à jour il y a  " + diff / 1000 + "secondes");
            if (localStorage.cities && diff < 300000) {
                let cityList = JSON.parse(localStorage.cities);
                for (let city of cityList) {
                    city.updatedAt = new Date(city.updatedAt);
                }
                console.log("Les données sont chargées via le local storage");
                commit('getCitiesList', cityList);
            } else {
                console.log('Mise à jour des données via l\'api');
                await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then((resp) => {
                        commit('getCitiesList', loadCities(resp.data.list));

                    });
            }
            setTimeout(() => dispatch('getCities'), 50000);

            function loadCities(list: any) {
                const cities = [];
                for (const {
                    name,
                    coord: {lat, lon},
                    weather: [{description: weather, icon: icon}],
                    main: {temp: temperature},
                    dt: updatedAt
                } of list) {
                    cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
                }
                localStorage.cities = JSON.stringify(cities);
                localStorage.lastUpdate = new Date();
                return cities;
            }
        },

    },
    modules: {},

})
