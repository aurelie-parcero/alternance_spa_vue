import {createStore} from 'vuex'
import axios from "axios";

let iconWidth = 50;
let iconHeight = 50;


export default createStore({
    state: {
        cities: [],
        centerMap: [process.env.VUE_APP_DEFAULT_LATITUDE, process.env.VUE_APP_DEFAULT_LONGITUDE],
        iconSize: [iconWidth, iconHeight],
        zoom: 12,
        test: 42
    },
    mutations: {
        getCitiesList: (state, cities) => (state.cities = cities),
        getTest: (state, test) => (state.test = test),
    },
    actions: {
        async getCities({commit, dispatch}) {
            await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then((resp) => {
                    commit('getCitiesList', loadCities(resp.data.list));
                    setTimeout( () => dispatch('getCities'), 300000);
                });

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
                return cities;
            }

    },
        testTest({commit}: { commit: any }) {
            commit('getTest', this.state.test * 2);
        }
    },
    modules: {},

})
