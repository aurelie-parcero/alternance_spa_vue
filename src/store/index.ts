import {createStore} from 'vuex'
import axios from "axios";


const actions = {
     async getCities({commit} : {commit:any}) {
        await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
            .then((resp) => {
                commit('getCitiesList', loadCities(resp.data.list))
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
                cities.push({name,lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
            }
            return cities;
        }

    }
}


export default createStore({
    state: {
        cities: [{}]
    },
    mutations: {
        getCitiesList: (state, cities) => (state.cities = cities)

    },
    actions: actions,
    modules: {},
    // getters: {
    //     loadedCities (state) {
    //         return state.cities.length
    //     }
    // }
})
